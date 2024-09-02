import express from "express";
import { login, signup, logout } from "../controllers/auth.controller.js";

const router = express.Router();

// Route for user signup
// Handles POST requests to /signup
router.post("/signup", signup);

// Route for user login
// Handles POST requests to /login
router.post("/login", login);

// Route for user logout
// Handles POST requests to /logout
router.post("/logout", logout);

export default router;
