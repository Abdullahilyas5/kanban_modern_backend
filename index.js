import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
import boardRoutes from "./routes/board.routes.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://kanban-modern.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/boards", boardRoutes);
app.use("/tasks", taskRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// IMPORTANT for Vercel
export default serverless(app);