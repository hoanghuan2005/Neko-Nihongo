import { supabaseAdmin } from "../config/db.js";

const pair = (a, b) => (a < b ? [a, b] : [b, a]);

// ✅ Kiểm tra quan hệ bạn bè
export const checkFriendship = async (req, res, next) => {
  try {
    const me = req.user.id;
    const recipientId = req.body?.recipientId ?? null;
    const memberIds = req.body?.memberIds ?? [];

    if (!recipientId && memberIds.length === 0) {
      return res.status(400).json({
        message: "Cần cung cấp recipientId hoặc memberIds",
      });
    }

    // ===== DIRECT =====
    if (recipientId) {
      const [userA, userB] = pair(me, recipientId);

      const { data: friend, error } = await supabaseAdmin
        .from("friends")
        .select("id")
        .eq("user_a", userA)
        .eq("user_b", userB)
        .single();

      if (error || !friend) {
        return res.status(403).json({
          message: "Bạn chưa kết bạn với người này",
        });
      }

      return next();
    }

    // ===== GROUP =====
    const friendChecks = await Promise.all(
      memberIds.map(async (memberId) => {
        const [userA, userB] = pair(me, memberId);
        const { data: friend, error } = await supabaseAdmin
          .from("friends")
          .select("id")
          .eq("user_a", userA)
          .eq("user_b", userB)
          .maybeSingle();

        return error || !friend ? memberId : null;
      })
    );

    const notFriends = friendChecks.filter(Boolean);

    if (notFriends.length > 0) {
      return res.status(403).json({
        message: "Bạn chỉ có thể thêm bạn bè vào nhóm.",
        notFriends,
      });
    }

    next();
  } catch (error) {
    console.error("checkFriendship error:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// ✅ Kiểm tra membership trong group
export const checkGroupMembership = async (req, res, next) => {
  try {
    const { conversationId } = req.body;
    const userId = req.user.id;

    // Kiểm tra membership trong bảng conversation_members
    const { data: member, error } = await supabaseAdmin
      .from("conversation_members")
      .select("id")
      .eq("conversation_id", conversationId)
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows found
      console.error("checkGroupMembership error:", error);
      return res.status(500).json({ message: "Lỗi hệ thống" });
    }

    if (!member) {
      return res.status(403).json({ message: "Bạn không ở trong group này." });
    }

    req.conversationId = conversationId;
    next();
  } catch (error) {
    console.error("checkGroupMembership error:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
