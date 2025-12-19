// Tính unread count động dựa trên last_seen_at
export const getUnreadCount = async (supabase, conversationId, userId) => {
  // Lấy last_seen_at của user trong conversation này
  const { data: member, error: memberError } = await supabase
    .from("conversation_members")
    .select("last_seen_at")
    .eq("conversation_id", conversationId)
    .eq("user_id", userId)
    .single();

  if (memberError) throw memberError;
  if (!member) return 0;

  const lastSeenAt = member.last_seen_at || new Date(0).toISOString();

  // Đếm messages có created_at > last_seen_at
  const { count, error: countError } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("conversation_id", conversationId)
    .gt("created_at", lastSeenAt);

  if (countError) throw countError;
  return count || 0;
};

// Cập nhật last_seen_at khi user xem conversation
export const markConversationAsSeen = async (
  supabase,
  conversationId,
  userId
) => {
  const now = new Date().toISOString();
  const { error } = await supabase
    .from("conversation_members")
    .update({ last_seen_at: now })
    .eq("conversation_id", conversationId)
    .eq("user_id", userId);

  if (error) throw error;
};

// export const updateConversationAfterCreateMessage = async (
//   conversationId,
//   message,
//   senderId
// ) => {
//   // 1. Update conversation meta
//   const { error: convError } = await supabase
//     .from("conversations")
//     .update({
//       last_message: message.content,
//       last_message_at: message.created_at,
//     })
//     .eq("id", conversationId);

//   if (convError) throw convError;

//   // 2. Cập nhật last_seen_at cho người gửi (đã xem tin nhắn của họ)
//   const { error: updateError } = await supabase
//     .from("conversation_members")
//     .update({ last_seen_at: message.created_at })
//     .eq("conversation_id", conversationId)
//     .eq("user_id", senderId);

//   if (updateError) throw updateError;
// };
