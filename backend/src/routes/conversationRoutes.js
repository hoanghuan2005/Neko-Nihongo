import express from "express";
import {
  createConversation,
  deleteConversation,
  getMessage,
  getConversation,
} from "../controller/conversationController.js";
import { checkFriendship } from "../middleware/friendMiddleware.js";

const router = express.Router();

router.get("/get", getConversation);
router.delete("/delete", deleteConversation);
router.post("/create", createConversation);
router.get("/:conversationId/messages", getMessage);

export default router;
