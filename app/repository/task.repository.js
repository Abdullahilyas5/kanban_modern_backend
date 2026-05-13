import prisma from "../../lib/prismaClient.js";

class TaskRepository {

    // CREATE TASK
    async createTask(data) {
        return await prisma.task.create({
            data,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
    }

    // GET TASKS BY BOARD
    async getTasksByBoard(boardId) {
        return await prisma.task.findMany({
            where: { boardId },
            include: {
                user: true,
                board: true
            }
        });
    }

    // UPDATE STATUS
    async updateTaskStatus({ taskId, status, userId }) {
        const result = await prisma.task.updateMany({
            where: {
                id: taskId,
                OR: [
                    { userId },
                    { assigneeId: userId }
                ]
            },
            data: {
                status
            }
        });

        if (result.count === 0) return null;
        return await prisma.task.findUnique({
            where: { id: taskId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
    }

    // UPDATE ASSIGNEE
    async updateAssignee({ taskId, assignee, assigneeId, userId }) {
        const result = await prisma.task.updateMany({
            where: {
                id: taskId,
                OR: [
                    { userId },
                    { assigneeId: userId }
                ]
            },
            data: {
                assignee,
                assigneeId
            }
        });

        if (result.count === 0) return null;
        return await prisma.task.findUnique({
            where: { id: taskId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
    }

    // UPDATE TASK (generic)
    async updateTask({ taskId, userId, data }) {
        const result = await prisma.task.updateMany({
            where: {
                id: taskId,
                OR: [
                    { userId },
                    { assigneeId: userId }
                ]
            },
            data
        });

        if (result.count === 0) return null;
        return await prisma.task.findUnique({
            where: { id: taskId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
    }

    // DELETE TASK
    async deleteTask({ taskId, userId }) {
        return await prisma.task.deleteMany({
            where: {
                id: taskId,
                OR: [
                    { userId },
                    { assigneeId: userId }
                ]
            }
        });
    }
}

export default new TaskRepository();
