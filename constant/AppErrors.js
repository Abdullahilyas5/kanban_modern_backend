// =====================
// HTTP STATUS CODES
// =====================
export const API_STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,

  TOO_MANY_REQUESTS: 429,

  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,

  // Database specific
  DUPLICATE_ENTRY: 11000,
};

// =====================
// RESPONSE MESSAGES
// =====================
export const RESPONSE_MESSAGES = {
  SUCCESS: "Success",

  // User
  USER_CREATION_FAILED: "Failed to create user",
  USER_REGISTERED_SUCCESS: "User registered successfully",
  USER_ALREADY_EXISTS: "User with this email already exists",
  USER_UPDATED_SUCCESS: "User updated successfully",
  USER_DELETED_SUCCESS: "User deleted successfully",
  USER_NOT_FOUND: "User not found",
  USER_NOT_VERIFIED: "User is not verified. Please verify your email via OTP",

  // Auth
  EMAIL_AND_PASSWORD_REQUIRED: "Email and password are required",
  INVALID_EMAIL_OR_PASSWORD: "Invalid email or password",
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  TOKEN_REFRESHED_SUCCESS: "Access token refreshed successfully",
  INVALID_REFRESH_TOKEN: "Invalid refresh token",
  TOKEN_EXPIRED: "Token expired",
  ACCESS_DENIED: "Access denied",
  UNAUTHORIZED_ACCESS: "You are not authorized to perform this action",

  // Validation
  FIELD_REQUIRED: "All fields are required",
  EMAIL_REQUIRED: "Please provide a valid email address",
  INVALID_EMAIL: "Invalid email address",
  INVALID_PHONE: "Invalid phone number",
  INVALID_PASSWORD: "Password must be at least 6 characters long",

  // OTP / Password reset
  OTP_SENT_SUCCESS: "OTP sent successfully to your email",
  OTP_VERIFIED_SUCCESS: "OTP verified successfully",
  INVALID_OTP: "Invalid or expired OTP",
  OTP_REQUIRED: "OTP is required",
  PASSWORD_RESET_SUCCESS: "Password reset successfully",
  NEW_PASSWORD_REQUIRED: "New password is required",
  CONFIRM_PASSWORD_REQUIRED: "Confirm password is required",
  PASSWORDS_DO_NOT_MATCH: "Passwords do not match",
  EMAIL_SEND_FAILED: "Failed to send email",
  EMAIL_SEND_SUCCESS: "Email sent successfully",

  // Posts
  POST_NOT_FOUND: "Post not found",
  POST_CREATED_SUCCESS: "Post created successfully",
  POST_UPDATED_SUCCESS: "Post updated successfully",
  POST_DELETED_SUCCESS: "Post deleted successfully",
  ALREADY_LIKED: "You have already liked this post",
  NOT_LIKED: "You have not liked this post",
  POST_LIKED_SUCCESS: "Post liked successfully",
  POST_DISLIKED_SUCCESS: "Post disliked successfully",
  POST_SAVED_SUCCESS: "Post saved successfully",
  POST_UNSAVED_SUCCESS: "Post unsaved successfully",

  // Comments
  COMMENT_CREATED: "Comment created successfully",
  COMMENT_UPDATED: "Comment updated successfully",
  COMMENT_NOT_FOUND: "Comment not found",
  COMMENT_DELETED_SUCCESS: "Comment deleted successfully",

  // Deals / Shop
  DEAL_NOT_FOUND: "Deal not found",
  DEAL_NOT_TRIED: "You can only review deals you have tried",
  SHOP_NOT_FOUND: "Shop not found",
  OYSTER_NOT_FOUND: "Oyster not found",

  // Stats
  STATS_NOT_FOUND: "Stats not found",
  TOTAL_STATS_SUCCESS: "Total stats fetched successfully",

  // Posts saved
  ALREADY_SAVED: "You have already saved this post",
  NOT_SAVED: "You have not saved this post",

  // Misc
  FILTER_NOT_FOUND: "Filter not found",
  INTERNAL_SERVER_ERROR: "Internal server error",
};

// =====================
// APP ERROR CLASS
// =====================
export default class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}