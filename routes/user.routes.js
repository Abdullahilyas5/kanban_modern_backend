

import { Router } from "express";
import UserController from "../controllers/user.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/refresh", UserController.getAccessToken);
router.get("/logout", UserController.logout);
router.get("/getusers", authMiddleware, UserController.getAllUsers);




export default router;
