import { supabaseAdmin } from "../config/db.js";

export const sendFriendRequest = async (req, res) => {
  try {
    const fromUser = req.user.id;
    const { toUser, message } = req.body;

    // thiếu user nhận lời mời
    if (!toUser) {
      return res.status(400).json({ error: "Thiếu user nhận lời mời" });
    }

    if (fromUser === toUser) {
      return res
        .status(400)
        .json({ error: "Không thể gửi lời mời kết bạn cho chính mình" });
    }

    // 1. Check đã là bạn chưa
    const a = fromUser < toUser ? fromUser : toUser;
    const b = fromUser < toUser ? toUser : fromUser;

    const { data: existingFriend } = await supabaseAdmin
      .from("friends")
      .select("id")
      .eq("user_a", a)
      .eq("user_b", b)
      .single();

    if (existingFriend) {
      return res.status(400).json({ error: "Đã là bạn bè" });
    }

    // 2 gửi request
    const { error } = await supabaseAdmin.from("friend_requests").insert({
      from_user: fromUser,
      to_user: toUser,
      message: message || null,
    });

    if (error) throw error;

    return res.status(201).json({ message: "Đã gửi lời mời kết bạn" });
  } catch (error) {
    console.error("Error sending friend request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { requestId } = req.params;

    // 1. Lấy request
    const { data: request, error } = await supabaseAdmin
      .from("friend_requests")
      .select("*")
      .eq("id", requestId)
      .single();

    if (error || !request) {
      return res.status(404).json({ error: "Request không tồn tại" });
    }

    if (request.to_user !== userId) {
      return res.status(403).json({ error: "Không có quyền accept" });
    }

    // 2. Insert friends (sorted)
    const userA =
      request.from_user < request.to_user ? request.from_user : request.to_user;

    const userB =
      request.from_user < request.to_user ? request.to_user : request.from_user;

    const { error: insertError } = await supabaseAdmin
      .from("friends")
      .insert({ user_a: userA, user_b: userB });

    if (insertError) throw insertError;

    // 3. Xóa request
    await supabaseAdmin.from("friend_requests").delete().eq("id", requestId);

    return res.json({ message: "Đã chấp nhận lời mời kết bạn" });
  } catch (error) {
    console.error("Error accepting friend:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const rejectFriendRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { requestId } = req.params;

    const { data: request } = await supabaseAdmin
      .from("friend_requests")
      .select("to_user")
      .eq("id", requestId)
      .single();

    if (!request) {
      return res.status(404).json({ error: "Request không tồn tại" });
    }

    if (request.to_user !== userId) {
      return res.status(403).json({ error: "Không có quyền reject" });
    }

    await supabaseAdmin.from("friend_requests").delete().eq("id", requestId);

    return res.json({ message: "Đã từ chối lời mời kết bạn" });
  } catch (error) {
    console.error("Error rejecting friend:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const getAllFriends = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabaseAdmin
      .from("friends")
      .select("*")
      .or(`user_a.eq.${userId},user_b.eq.${userId}`);

    if (error) throw error;

    const friends = data.map((f) =>
      f.user_a === userId ? f.user_b : f.user_a
    );

    return res.json(friends);
  } catch (error) {
    console.error("Error getting all friend:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabaseAdmin
      .from("friend_requests")
      .select("*")
      .eq("to_user", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.json({
      message: "Yêu cần kết bạn",
      data,
    });
  } catch (error) {
    console.error("Error getting friend requests:", error);
    return res.status(500).json({ error: error.message });
  }
};
