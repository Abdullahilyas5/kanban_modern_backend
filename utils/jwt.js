
import jwt from 'jsonwebtoken';
// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
const ACCESS_TOKEN_EXPIRY = '15m'; // 15 minutes
const REFRESH_TOKEN_EXPIRY = '7d'; // 7 days

const normalizeUserId = (userId) => {
    if (userId && typeof userId === 'object') {
        return Number(userId.userId ?? userId.id);
    }

    return Number(userId);
};

class JWTUtils {
    // Generate access token
    static generateAccessToken(userId) {
        const normalizedUserId = normalizeUserId(userId);

        return jwt.sign(
            { userId: normalizedUserId },
            JWT_SECRET,
            { expiresIn: ACCESS_TOKEN_EXPIRY }
        );
    }

    // Generate refresh token
    static generateRefreshToken(userId) {
        const normalizedUserId = normalizeUserId(userId);

        return jwt.sign(
            { userId: normalizedUserId },
            JWT_REFRESH_SECRET,
            { expiresIn: REFRESH_TOKEN_EXPIRY }
        );
    }

    // Verify access token
    static verifyAccessToken(token) {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            throw new Error('Invalid access token');
        }
    }

    // Verify refresh token
    static verifyRefreshToken(token) {
        try {
            return jwt.verify(token, JWT_REFRESH_SECRET);
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }

    static getAccessTokenFromRefreshToken(refreshToken) {
        try {
            const decoded = this.verifyRefreshToken(refreshToken);
            return this.generateAccessToken(decoded.userId);
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }

    // Decode token without verification (for getting userId)
    static decodeToken(token) {
        try {
            return jwt.decode(token);
        } catch (error) {
            throw new Error('Invalid token format');
        }
    }
}

export default JWTUtils;
