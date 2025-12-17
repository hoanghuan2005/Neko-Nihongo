import express from "express";
import {
  sendDirectMessage,
  sendGroupMessage,
  // getConversationUnreadCount,
  // markAsRead,
} from "../controller/messageController.js";

const router = express.Router();

router.post("/direct", sendDirectMessage);

router.post("/group", sendGroupMessage);

// router.get("/:conversationId/unread", getConversationUnreadCount);

// router.post("/mark-as-read", markAsRead);

export default router;
