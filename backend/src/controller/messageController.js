import { supabaseAdmin } from "../config/db.js";

export const sendDirectMessage = async (req, res) => {
  try {
    const { recipientId, content, conversationId } = req.body;
    const senderId = req.user.id;

    let convId = conversationId;

    if (!convId) {
      const { data: existing } = await supabaseAdmin.rpc(
        "get_direct_conversation",
        {
          user_a: senderId,
          user_b: recipientId,
        }
      );

      convId = existing?.[0]?.id;
    }

    if (!convId) {
      const { data: conversation, error } = await supabaseAdmin
        .from("conversations")
        .insert({
          type: "direct",
          created_by: senderId,
        })
        .select()
        .single();

      if (error) throw error;

      convId = conversation.id;

      await supabaseAdmin.from("conversation_members").insert([
        {
          conversation_id: convId,
          user_id: senderId,
        },
        {
          conversation_id: convId,
          user_id: recipientId,
        },
      ]);
    }

    const { data: message, error: msgError } = await supabaseAdmin
      .from("messages")
      .insert({
        conversation_id: convId,
        sender_id: senderId,
        content,
      })
      .select()
      .single();

    if (msgError) throw msgError;

    await supabaseAdmin
      .from("conversations")
      .update({
        last_message_id: message.id,
        last_message_at: message.created_at,
      })
      .eq("id", convId);

    return res.status(201).json({ conversationId: convId, message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { conversationId, content } = req.body;

    if (!conversationId || !content) {
      return res.status(400).json({ message: "Thiếu dữ liệu" });
    }

    // 1. Check user có thuộc group không
    const { data: member } = await supabaseAdmin
      .from("conversation_members")
      .select("id")
      .eq("conversation_id", conversationId)
      .eq("user_id", senderId)
      .single();

    if (!member) {
      return res.status(403).json({ message: "Không thuộc group này" });
    }

    // 2. Create message
    const { data: message, error: msgError } = await supabaseAdmin
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        content,
      })
      .select()
      .single();

    if (msgError) throw msgError;

    // 3. Update conversation meta
    await supabaseAdmin
      .from("conversations")
      .update({
        last_message_id: message.id,
        last_message_at: message.created_at,
      })
      .eq("id", conversationId);

    // 4. Update last_seen_at của sender
    await supabaseAdmin
      .from("conversation_members")
      .update({ last_seen_at: new Date() })
      .eq("conversation_id", conversationId)
      .eq("user_id", senderId);

    return res.status(201).json({ message });
  } catch (error) {
    console.error("sendGroupMessage error:", error);
    return res.status(500).json({ message: error.message });
  }
};
