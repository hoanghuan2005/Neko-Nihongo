import express from "express";
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getAllFriends,
  getFriendRequests,
} from "../controller/friendController.js";

const router = express.Router();

router.get("/requests", getFriendRequests);

router.post("/requests", sendFriendRequest);

router.post("/requests/:requestId/accept", acceptFriendRequest);

router.post("/requests/:requestId/reject", rejectFriendRequest);

router.get("/all", getAllFriends);

export default router;
