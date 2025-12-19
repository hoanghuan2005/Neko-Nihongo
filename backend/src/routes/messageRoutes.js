import express from "express";
import {
  sendDirectMessage,
  sendGroupMessage,
  // getConversationUnreadCount,
  // markAsRead,
} from "../controller/messageController.js";
import { checkFriendship } from "../middleware/friendMiddleware.js";
import { checkGroupMembership } from "../middleware/friendMiddleware.js";

const router = express.Router();

router.post("/direct", checkFriendship, sendDirectMessage);

router.post("/group", checkGroupMembership, sendGroupMessage);

// router.get("/:conversationId/unread", getConversationUnreadCount);

// router.post("/mark-as-read", markAsRead);

export default router;
