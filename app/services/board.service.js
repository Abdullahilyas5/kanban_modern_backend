import BoardRepository from "../repository/board.repository.js";

class BoardService {

    // CREATE BOARD
    async createBoard({ name, userId }) {
        try {
            if (!name || name.trim() === "") {
                throw new Error("Board name is required");
            }

            const boardData = {
                name: name.trim(),
                userId
            };
            
            const board = await BoardRepository.createBoard(boardData);

            return board;

        } catch (error) {
            throw new Error(error.message || "Failed to create board");
        }
    }

    // GET ALL BOARDS OF USER
    async getBoards(userId) {
        try {
            if (!userId) {
                throw new Error("User ID is required");
            }

            return await BoardRepository.getBoards(userId);

        } catch (error) {
            throw new Error(error.message || "Failed to fetch boards");
        }
    }

    // GET SINGLE BOARD
    async getBoardById({ boardId, userId }) {
        try {
            if (!boardId || !userId) {
                throw new Error("Board ID and User ID are required");
            }

            const board = await BoardRepository.getBoardById({
                boardId,
                userId
            });

            if (!board) {
                throw new Error("Board not found");
            }

            return board;

        } catch (error) {
            throw new Error(error.message || "Failed to fetch board");
        }
    }

    // UPDATE BOARD
    async updateBoard({ boardId, userId, name }) {
        try {
            if (!boardId || !userId) {
                throw new Error("Board ID and User ID are required");
            }

            if (!name || name.trim() === "") {
                throw new Error("Board name cannot be empty");
            }

            return await BoardRepository.updateBoard({
                boardId,
                userId,
                name: name.trim()
            });

        } catch (error) {
            throw new Error(error.message || "Failed to update board");
        }
    }

    // DELETE BOARD
    async deleteBoard({ boardId, userId }) {
        try {
            if (!boardId || !userId) {
                throw new Error("Board ID and User ID are required");
            }

            const deleted = await BoardRepository.deleteBoard({
                boardId,
                userId
            });

            if (!deleted) {
                throw new Error("Board not found or already deleted");
            }

            return deleted;

        } catch (error) {
            throw new Error(error.message || "Failed to delete board");
        }
    }
}

export default new BoardService();