import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import lessonRoutes from "./routes/lessonsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import friendRoutes from "./routes/friendRoute.js";
import messageRoutes from "./routes/messageRoutes.js";
import { requireAuth } from "./middleware/requireAuth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/lesson", lessonRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/friend", requireAuth, friendRoutes);

app.use("/api/message", requireAuth, messageRoutes);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
