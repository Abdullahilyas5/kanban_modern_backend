import express from "express";
import TaskController from "../controllers/task.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes protected
router.use(authMiddleware);

// CREATE TASK
router.post("/", TaskController.createTask);

// GET TASKS BY BOARD
router.get("/board/:boardId", TaskController.getTasksByBoard);

// UPDATE STATUS (drag & drop)
router.patch("/status", TaskController.updateTaskStatus);

// UPDATE ASSIGNEE
router.patch("/assignee", TaskController.updateAssignee);

// UPDATE TASK DETAILS
router.patch("/:taskId", TaskController.updateTask);

// DELETE TASK
router.delete("/:taskId", TaskController.deleteTask);

export default router;
