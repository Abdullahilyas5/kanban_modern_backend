import TaskService from "../app/services/task.service.js";
import { API_STATUS_CODES } from "../constant/AppErrors.js";

const VALID_STATUSES = ["todo", "in_progress", "done"];
const VALID_PRIORITIES = ["low", "medium", "high", "urgent"];

const validateTaskPayload = (payload, { partial = false } = {}) => {
    const errors = [];
    const data = {};

    if (!partial || payload.name !== undefined) {
        if (!payload.name || String(payload.name).trim().length < 2) {
            errors.push("Title must be at least 2 characters");
        } else {
            data.name = String(payload.name).trim();
        }
    }

    if (!partial || payload.description !== undefined) {
        data.description = payload.description ? String(payload.description).trim() : "";
    }

    if (!partial || payload.status !== undefined) {
        if (!VALID_STATUSES.includes(payload.status)) {
            errors.push("Invalid status");
        } else {
            data.status = payload.status;
        }
    }

    if (!partial || payload.priority !== undefined) {
        const priority = payload.priority || "medium";
        if (!VALID_PRIORITIES.includes(priority)) {
            errors.push("Invalid priority");
        } else {
            data.priority = priority;
        }
    }

    if (payload.assigneeId !== undefined) {
        data.assigneeId = payload.assigneeId ? Number(payload.assigneeId) : null;
        if (data.assigneeId !== null && !Number.isInteger(data.assigneeId)) {
            errors.push("Invalid assignee");
        }
    }

    if (payload.assignee !== undefined) {
        data.assignee = payload.assignee ? String(payload.assignee).trim() : "";
    }

    if (payload.dueDate !== undefined) {
        data.dueDate = payload.dueDate ? new Date(payload.dueDate) : null;
        if (data.dueDate && Number.isNaN(data.dueDate.getTime())) {
            errors.push("Invalid due date");
        }
    }

    return { data, errors };
};

class TaskController {

    // CREATE TASK
    async createTask(req, res) {
        try {
            const { boardId } = req.body;
            const userId = req.user.userId;
            const { data, errors } = validateTaskPayload(req.body);

            if (!boardId || errors.length > 0) {
                return res.status(API_STATUS_CODES.BAD_REQUEST).json({
                    status: API_STATUS_CODES.BAD_REQUEST,
                    message: errors[0] || "Board ID is required"
                });
            }

            const task = await TaskService.createTask({
                boardId: Number(boardId),
                userId,
                ...data
            });

            return res.status(201).json({
                status: API_STATUS_CODES.SUCCESS,
                task
            });

        } catch (error) {
            return res.status(500).json({
                message: error.message || "Internal Server Error"
            });
        }
    }

    // GET TASKS BY BOARD
    async getTasksByBoard(req, res) {
        try {
            const { boardId } = req.params;

            const tasks = await TaskService.getTasksByBoard(Number(boardId));

            return res.status(200).json({
                status: API_STATUS_CODES.SUCCESS,
                tasks
            });

        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }

    // UPDATE TASK STATUS (drag & drop)
    async updateTaskStatus(req, res) {
        try {
            const { taskId, status } = req.body;
            const userId = req.user.userId;

            if (!taskId || !VALID_STATUSES.includes(status)) {
                return res.status(API_STATUS_CODES.BAD_REQUEST).json({
                    status: API_STATUS_CODES.BAD_REQUEST,
                    message: "Task ID and valid status are required"
                });
            }

            const task = await TaskService.updateTaskStatus({
                taskId: Number(taskId),
                status,
                userId
            });

            return res.status(200).json({
                status: API_STATUS_CODES.SUCCESS,
                task
            });

        } catch (error) {
            return res.status(error.message.includes("unauthorized") ? 403 : 500).json({
                message: error.message
            });
        }
    }

    async updateTask(req, res) {
        try {
            const { taskId } = req.params;
            const userId = req.user.userId;
            const { data, errors } = validateTaskPayload(req.body, { partial: true });

            if (!taskId || errors.length > 0) {
                return res.status(API_STATUS_CODES.BAD_REQUEST).json({
                    status: API_STATUS_CODES.BAD_REQUEST,
                    message: errors[0] || "Task ID is required"
                });
            }

            const task = await TaskService.updateTask({
                taskId: Number(taskId),
                userId,
                data
            });

            return res.status(200).json({
                status: API_STATUS_CODES.SUCCESS,
                task
            });

        } catch (error) {
            return res.status(error.message.includes("unauthorized") ? 403 : 500).json({
                message: error.message
            });
        }
    }

    // UPDATE ASSIGNEE
    async updateAssignee(req, res) {
        try {
            const { taskId, assignee, assigneeId } = req.body;
            const userId = req.user.userId;

            const task = await TaskService.updateAssignee({
                taskId: Number(taskId),
                assignee,
                assigneeId,
                userId
            });

            return res.status(200).json({
                status: API_STATUS_CODES.SUCCESS,
                task
            });

        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }

    // DELETE TASK
    async deleteTask(req, res) {
        try {
            const { taskId } = req.params;
            const userId = req.user.userId;

            await TaskService.deleteTask({
                taskId: Number(taskId),
                userId
            });

            return res.status(200).json({
                status: API_STATUS_CODES.SUCCESS,
                message: "Task deleted successfully"
            });

        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
}

export default new TaskController();
