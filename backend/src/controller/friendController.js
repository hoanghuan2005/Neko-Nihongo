import { supabase } from "../config/db";

export const sendFriendRequest = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error sending friend request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error accepting friend:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const rejectFriendRequest = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error rejecting friend:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllFriends = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error getting all friend:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error getting friend requests:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
