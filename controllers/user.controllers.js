
import UserService from "../app/services/user.services.js";
import { RESPONSE_MESSAGES, API_STATUS_CODES } from "../constant/AppErrors.js";
import JWTUtils from "../utils/jwt.js";

class UserController {

    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            const user = await UserService.register({ name, email, password });

            if (!user) {
                return res.status(API_STATUS_CODES.UNAUTHORIZED).json({
                    status: API_STATUS_CODES.UNAUTHORIZED,
                    message: RESPONSE_MESSAGES.INVALID_EMAIL_OR_PASSWORD
                });
            }

            const token = JWTUtils.generateAccessToken(user.id);
            const refreshToken = JWTUtils.generateRefreshToken(user.id);


            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            return res.status(201).json({
                user,
                token,
                status: API_STATUS_CODES.SUCCESS,
                message: RESPONSE_MESSAGES.SUCCESS
            });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                status: error.statusCode || 500,
                message: error.message || "Internal Server Error"
            });
        }
    }


    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserService.login({ email, password });
            if (!user) {
                return res.status(API_STATUS_CODES.UNAUTHORIZED).json({
                    status: API_STATUS_CODES.UNAUTHORIZED,
                    message: RESPONSE_MESSAGES.INVALID_EMAIL_OR_PASSWORD
                });
            }

            const token = JWTUtils.generateAccessToken(user.id);
            const refreshToken = JWTUtils.generateRefreshToken(user.id);


            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            return res.status(200).json({
                user,
                token,
                status: API_STATUS_CODES.SUCCESS,
                message: RESPONSE_MESSAGES.SUCCESS
            });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                status: error.statusCode || 500,
                message: error.message || "Internal Server Error"
            });
        }
    }

    async logout (req , res){
        try {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            return res.status(200).json({
                status: API_STATUS_CODES.SUCCESS,
                message: RESPONSE_MESSAGES.LOGOUT_SUCCESS
            });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                status: error.statusCode || 500,
                message: error.message || "Internal Server Error"
            });
        }
    }


    async getAccessToken(req, res) {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                return res.status(API_STATUS_CODES.UNAUTHORIZED).json({
                    status: API_STATUS_CODES.UNAUTHORIZED,
                    message: RESPONSE_MESSAGES.REFRESH_TOKEN_MISSING
                });
            }

            const token = JWTUtils.getAccessTokenFromRefreshToken(refreshToken);

            return res.status(200).json({
                token,
                status: API_STATUS_CODES.SUCCESS,
                message: RESPONSE_MESSAGES.SUCCESS
            });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                status: error.statusCode || 500,
                message: error.message || "Internal Server Error"
            });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            return res.status(200).json({
                users,
                status: API_STATUS_CODES.SUCCESS,
                message: RESPONSE_MESSAGES.SUCCESS
            });
        } catch (error) {   
            return res.status(error.statusCode || 500).json({
                status: error.statusCode || 500,
                message: error.message || "Internal Server Error"
            });
        }   
        }

};


export default new UserController();
