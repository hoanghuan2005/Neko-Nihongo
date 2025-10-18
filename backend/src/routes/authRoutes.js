import express from "express";
import {
  signup,
  login,
  logout,
  getUser,
} from "../controller/authController.js";

const router = express.Router();

router.get("/me", getUser);

router.post("/login", login);

router.post("/signup", signup);

router.delete("/logout", logout);

export default router;
