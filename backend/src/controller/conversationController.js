import { supabaseAdmin } from "../config/db.js";

// ✅ Tạo conversation + thêm thành viên vào conversation_members
export const createConversation = async (req, res) => {
  try {
    const { type, name, memberIds } = req.body;
    const userId = req.user.id;

    if (
      !type ||
      (type === "group" && !name) ||
      !memberIds ||
      !Array.isArray(memberIds) ||
      memberIds.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Tên nhóm và danh sách thành viên là bắt buộc" });
    }

    let conversation;

    // Tạo conversation
    const { data: convo, error: convoError } = await supabaseAdmin
      .from("conversations")
      .insert([
        {
          type,
          name: type === "group" ? name : null,
          created_by: userId,
          last_message_at: new Date(),
        },
      ])
      .select()
      .single();

    if (convoError) throw convoError;
    conversation = convo;

    // Thêm thành viên vào conversation_members
    const members = [
      { conversation_id: conversation.id, user_id: userId }, // người tạo
      ...memberIds.map((id) => ({
        conversation_id: conversation.id,
        user_id: id,
      })),
    ];

    const { error: memberError } = await supabaseAdmin
      .from("conversation_members")
      .insert(members);

    if (memberError) throw memberError;

    return res.status(201).json({ conversation });
  } catch (error) {
    console.error("Lỗi khi tạo conversation", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// ✅ Lấy danh sách conversation của user
export const getConversation = async (req, res) => {
  try {
    const userId = req.user.id;

    // Lấy tất cả conversation mà user tham gia
    const { data, error } = await supabaseAdmin
      .from("conversation_members")
      .select("conversation_id, conversations(*)")
      .eq("user_id", userId)
      .order("joined_at", { ascending: false });

    if (error) throw error;

    const conversations = data.map((row) => row.conversations);

    return res.status(200).json({ conversations });
  } catch (error) {
    console.error("Lỗi xảy ra khi lấy conversations", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// ✅ Xóa conversation (xóa cascade sẽ xóa luôn members và messages)
export const deleteConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const { error } = await supabaseAdmin
      .from("conversations")
      .delete()
      .eq("id", conversationId);

    if (error) throw error;

    return res.status(200).json({ message: "Conversation deleted" });
  } catch (error) {
    console.error("Lỗi khi xóa conversation", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// ✅ Lấy messages trong conversation
export const getMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { limit = 50, cursor } = req.query;

    let query = supabaseAdmin
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: false })
      .limit(Number(limit) + 1);

    if (cursor) {
      query = query.lt("created_at", cursor);
    }

    const { data: messages, error } = await query;
    if (error) throw error;

    let nextCursor = null;
    let result = messages;

    if (messages.length > Number(limit)) {
      const nextMessage = messages[messages.length - 1];
      nextCursor = nextMessage.created_at;
      result.pop();
    }

    result = result.reverse();

    return res.status(200).json({
      messages: result,
      nextCursor,
    });
  } catch (error) {
    console.error("Lỗi xảy ra khi lấy messages", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
