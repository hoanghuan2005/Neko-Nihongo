import express from "express";
import {
  getLessons,
  addLessons,
  updateLessons,
  deleteLessons,
} from "../controller/lessonsController.js";

const router = express.Router();

router.get("/get", getLessons);

router.post("/add", addLessons);

router.put("/update/:id", updateLessons);

router.delete("/delete/:id", deleteLessons);

export default router;
