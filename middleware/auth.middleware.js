import JWTUtils from "../utils/jwt.js";
import { API_STATUS_CODES, RESPONSE_MESSAGES } from "../constant/AppErrors.js";

const authMiddleware = (req, res, next) => {
    try {
        // 1. Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(API_STATUS_CODES.UNAUTHORIZED).json({
                status: API_STATUS_CODES.UNAUTHORIZED,
                message: RESPONSE_MESSAGES.UNAUTHORIZED || "No token provided"
            });
        }

        // 2. Extract token
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(API_STATUS_CODES.UNAUTHORIZED).json({
                status: API_STATUS_CODES.UNAUTHORIZED,
                message: "Token missing"
            });
        }

        // 3. Verify token
        const decoded = JWTUtils.verifyAccessToken(token);
        const userId = Number(decoded.userId);

        if (!decoded || !Number.isInteger(userId)) {
            return res.status(API_STATUS_CODES.UNAUTHORIZED).json({
                status: API_STATUS_CODES.UNAUTHORIZED,
                message: "Invalid or expired token"
            });
        }

        // 4. Attach user to request
        req.user = {
            userId
        };

        next();

    } catch (error) {
        return res.status(API_STATUS_CODES.UNAUTHORIZED).json({
            status: API_STATUS_CODES.UNAUTHORIZED,
            message: "Authentication failed"
        });
    }
};

export default authMiddleware;
