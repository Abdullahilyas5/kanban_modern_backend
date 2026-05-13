import express from "express";
import BoardController from "../controllers/board.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// protect all board routes
router.use(authMiddleware);

//
// CREATE BOARD
//
router.post("/", BoardController.createBoard);

//
// GET ALL BOARDS OF LOGGED IN USER
//
router.get("/", BoardController.getBoards);

//
// GET SINGLE BOARD
//
router.get("/:id", BoardController.getBoardById);

//
// DELETE BOARD
//
router.delete("/:id", BoardController.deleteBoard);

export default router;