import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";

// Middleware to protect routes by verifying JWT tokens
export const protectRoute = async (req, res, next) => {
  try {
    // Retrieve the token from cookies
    const token = req.cookies["jwt-streaming"];

    // If no token is found, respond with unauthorized status
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token Provided" });
    }

    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

    // If token verification fails, respond with unauthorized status
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid Token" });
    }

    // Fetch the user from the database using the ID from the token
    const user = await User.findById(decoded.userId).select("-password");

    // If the user is not found, respond with not found status
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Attach the user object to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Log the error and respond with an internal server error status
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
