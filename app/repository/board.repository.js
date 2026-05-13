import prisma from "../../lib/prismaClient.js";

const normalizeUserId = (userId) => {
    if (typeof userId === "number") {
        return userId;
    }

    if (typeof userId === "string") {
        return Number(userId);
    }

    if (userId && typeof userId === "object") {
        return Number(userId.userId ?? userId.id ?? userId);
    }

    return null;
};

class BoardRepository {

    async createBoard({ name, userId }) {
        const normalizedUserId = normalizeUserId(userId);
        return await prisma.board.create({
            data: {
                name,
                userId: normalizedUserId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                tasks: true
            }
        });
    }

    async updateBoard({ boardId, name, userId }) {
        const normalizedUserId = normalizeUserId(userId);
        return await prisma.board.updateMany({
            where: {
                id: boardId,
                userId: normalizedUserId
            },
            data: {
                name
            }
        });
    }

    async getBoards(userId) {
        return await prisma.board.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                tasks: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });
    }

    async getBoardById({ boardId, userId }) {
        return await prisma.board.findFirst({
            where: {
                id: boardId
            },
            include: {
                tasks: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                },
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

    async deleteBoard({ boardId, userId }) {
        const normalizedUserId = normalizeUserId(userId);
        return await prisma.board.deleteMany({
            where: {
                id: boardId,
                userId: normalizedUserId
            }
        });
    }
}

export default new BoardRepository();
