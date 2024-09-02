import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokens.js";

// Helper function to send error responses
const sendErrorResponse = (res, status, message) => {
  return res.status(status).json({ success: false, message });
};

// Helper function to validate user input
const validateUserInput = ({ email, password, username }) => {
  if (!email || !password || !username) {
    return "All fields are required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
};

// Helper function to check if user exists
const checkIfUserExists = async (email, username) => {
  const existingUserByEmail = await User.findOne({ email });
  if (existingUserByEmail) {
    return "Email already exists";
  }

  const existingUserByUsername = await User.findOne({ username });
  if (existingUserByUsername) {
    return "Username already exists";
  }

  return null;
};

// Helper function to handle user signup
const handleUserSignup = async (email, password, username) => {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
  const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

  const newUser = new User({
    email,
    password: hashedPassword,
    username,
    image,
  });

  await newUser.save();
  return newUser;
};

export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;

    // Validate user input
    const validationError = validateUserInput({ email, password, username });
    if (validationError) {
      return sendErrorResponse(res, 400, validationError);
    }

    // Check if user already exists
    const userExistError = await checkIfUserExists(email, username);
    if (userExistError) {
      return sendErrorResponse(res, 400, userExistError);
    }

    // Handle user signup
    const newUser = await handleUserSignup(email, password, username);

    // Generate token and set cookie
    generateTokenAndSetCookie(newUser._id, res);

    // Remove password from response
    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendErrorResponse(res, 400, "All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return sendErrorResponse(res, 404, "Invalid credentials");
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return sendErrorResponse(res, 404, "Invalid credentials");
    }

    // Generate token and set cookie
    generateTokenAndSetCookie(user._id, res);

    // Remove password from response
    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-streaming");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
