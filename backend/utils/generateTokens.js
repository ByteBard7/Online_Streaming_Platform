import jwt from "jsonwebtoken"; // Import JSON Web Token library for generating tokens
import { ENV_VARS } from "../config/envVars.js"; // Import environment variables

/**
 * Generates a JWT token for the user and sets it in an HTTP-only cookie.
 *
 * @param {string} userId - The ID of the user for whom the token is generated.
 * @param {object} res - The Express response object used to set the cookie.
 * @returns {string} - The generated JWT token.
 */
export const generateTokenAndSetCookie = (userId, res) => {
  // Create a JWT token with the user ID as payload and a 15-day expiration time
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

  // Set the token in an HTTP-only cookie
  res.cookie("jwt-streaming", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie expires in 15 days (maxAge is in milliseconds)
    httpOnly: true, // Cookie is not accessible via JavaScript
    sameSite: "Strict", // Cookie is sent only for same-site requests
    secure: ENV_VARS.NODE_ENV !== "development", // Cookie is only sent over HTTPS in non-development environments
  });

  // Return the generated token
  return token;
};
