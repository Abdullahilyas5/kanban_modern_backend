import TaskRepository from "../repository/task.repository.js";

class TaskService {

    // CREATE TASK
    async createTask({ name, description = "", priority = "medium", dueDate = null, boardId, userId, assignee = "", assigneeId = null, status = "todo" }) {
        try {
            if (!name) throw new Error("Task name is required");
            if (!boardId) throw new Error("Board ID is required");

            const validStatuses = ["todo", "in_progress", "done"];
            if (!validStatuses.includes(status)) {
                throw new Error("Invalid status value");
            }

            const taskData = {
                name: name.trim(),
                description,
                priority,
                dueDate,
                boardId,
                userId,
                assignee,
                assigneeId,
                status
            };

            return await TaskRepository.createTask(taskData);

        } catch (error) {
            throw new Error(error.message || "Failed to create task");
        }
    }

    // GET TASKS BY BOARD
    async getTasksByBoard(boardId) {
        try {
            if (!boardId) throw new Error("Board ID is required");

            return await TaskRepository.getTasksByBoard(boardId);

        } catch (error) {
            throw new Error(error.message || "Failed to fetch tasks");
        }
    }

    // UPDATE TASK STATUS (drag & drop use case)
    async updateTaskStatus({ taskId, status, userId }) {
        try {
            if (!taskId) throw new Error("Task ID is required");
            if (!status) throw new Error("Status is required");

            const validStatuses = ["todo", "in_progress", "done"];

            if (!validStatuses.includes(status)) {
                throw new Error("Invalid status value");
            }

            const task = await TaskRepository.updateTaskStatus({
                taskId,
                status,
                userId
            });

            if (!task) {
                throw new Error("Task not found or unauthorized");
            }

            return task;

        } catch (error) {
            throw new Error(error.message || "Failed to update task status");
        }
    }

    // UPDATE ASSIGNEE
    async updateAssignee({ taskId, assignee, assigneeId, userId }) {
        try {
            if (!taskId) throw new Error("Task ID is required");

            const task = await TaskRepository.updateAssignee({
                taskId,
                assignee,
                assigneeId,
                userId
            });

            if (!task) {
                throw new Error("Task not found or unauthorized");
            }

            return task;

        } catch (error) {
            throw new Error(error.message || "Failed to update assignee");
        }
    }

    // UPDATE TASK (general update)
    async updateTask({ taskId, userId, data }) {
        try {
            if (!taskId) throw new Error("Task ID is required");

            const task = await TaskRepository.updateTask({
                taskId,
                userId,
                data
            });

            if (!task) {
                throw new Error("Task not found or unauthorized");
            }

            return task;

        } catch (error) {
            throw new Error(error.message || "Failed to update task");
        }
    }

    // DELETE TASK
    async deleteTask({ taskId, userId }) {
        try {
            if (!taskId) throw new Error("Task ID is required");

            return await TaskRepository.deleteTask({
                taskId,
                userId
            });

        } catch (error) {
            throw new Error(error.message || "Failed to delete task");
        }
    }
}

export default new TaskService();
