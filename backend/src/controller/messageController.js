import { supabase } from "../config/db.js";

export const sendDirectMessage = async (req, res) => {
  try {
    const { recipientId, content, conversationId } = req.body;
    const senderId = req.user.id;

    if (!content) {
      return res.status(400).json({ message: "Thiếu nội dung" });
    }

    let convId = conversationId;

    // 1. Nếu có conversationId → dùng luôn
    if (!convId) {
      // 2. Nếu chưa có → tìm conversation direct
      const { data: existing } = await supabase.rpc("get_direct_conversation", {
        user_a: senderId,
        user_b: recipientId,
      });

      convId = existing?.id;
    }

    // 3. Nếu vẫn chưa có → tạo conversation
    if (!convId) {
      const { data: conversation, error: convError } = await supabase
        .from("conversations")
        .insert({
          type: "direct",
          created_by: senderId,
        })
        .select()
        .single();

      if (convError) throw convError;

      convId = conversation.id;

      // add members
      const { error: memberError } = await supabase
        .from("conversation_members")
        .insert([
          {
            conversation_id: convId,
            user_id: senderId,
            joined_at: new Date(),
            last_seen_at: new Date(),
          },
          {
            conversation_id: convId,
            user_id: recipientId,
            joined_at: new Date(),
          },
        ]);

      if (memberError) throw memberError;
    }

    // 4. Create message
    const { data: message, error: msgError } = await supabase
      .from("messages")
      .insert({
        conversation_id: convId,
        sender_id: senderId,
        content,
      })
      .select()
      .single();

    if (msgError) throw msgError;

    // 5. Update conversation meta
    await supabase
      .from("conversations")
      .update({
        last_message_id: message.id,
        last_message_at: message.created_at,
      })
      .eq("id", convId);

    return res.status(201).json({
      conversationId: convId,
      message,
    });
  } catch (error) {
    console.error("Lỗi xảy ra khi gửi tin nhắn trực tiếp", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const { conversationId, content } = req.body;
    const senderId = req.user.id;

    if (!content) {
      return res.status(400).json({ message: "Thiếu nội dung" });
    }

    if (!conversationId) {
      return res.status(400).json({ message: "Thiếu conversationId" });
    }

    // 1. Create message
    const { data: message, error: msgError } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        content,
      })
      .select()
      .single();

    if (msgError) throw msgError;

    // 2. Update conversation meta
    await supabase
      .from("conversations")
      .update({
        last_message: content,
        last_message_at: message.created_at,
      })
      .eq("id", conversationId);

    // 3. Update last_seen_at của sender
    await supabase
      .from("conversation_members")
      .update({ last_seen_at: new Date() })
      .eq("conversation_id", conversationId)
      .eq("user_id", senderId);

    return res.status(201).json({ message });
  } catch (error) {
    console.error("Lỗi xảy ra khi gửi tin nhắn nhóm", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
