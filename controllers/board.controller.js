import BoardService from "../app/services/board.service.js";
import AppError, { API_STATUS_CODES } from "../constant/AppErrors.js";

class BoardController {

    async createBoard(req, res) {
        try {
            const { name } = req.body;
            const userId = req.user.userId;

            const board = await BoardService.createBoard({ name, userId });

            if(!board){
                throw new AppError("Board creation failed", API_STATUS_CODES.INTERNAL_SERVER_ERROR);
            }

            return res.status(201).json({
                status: API_STATUS_CODES.SUCCESS,
                board
            });

        } catch (error) {
            return res.status(error.statusCode || 500).json({
                status: error.statusCode || 500,
                message: error.message || "Internal Server Error"
            });
        }
    }

    async getBoards(req, res) {
        try {
            const userId = req.user.userId;

            const boards = await BoardService.getBoards(userId);

            return res.status(200).json({
                status: API_STATUS_CODES.SUCCESS,
                boards
            });

        } catch (error) {
            return res.status(500).json({
                message: error.message || "Internal Server Error"
            });
        }
    }

    async getBoardById(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.userId;

            const board = await BoardService.getBoardById({
                boardId: Number(id),
                userId
            });

            if (!board) {
                return res.status(404).json({
                    message: "Board not found"
                });
            }

            return res.status(200).json({
                board
            });

        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }

    async deleteBoard(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.userId;

            await BoardService.deleteBoard({
                boardId: Number(id),
                userId
            });

            return res.status(200).json({
                message: "Board deleted"
            });

        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
}

export default new BoardController();