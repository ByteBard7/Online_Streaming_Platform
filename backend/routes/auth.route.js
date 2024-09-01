import express from "express";
import { login, signup, logout } from "../controllers/auth.controller.js";

const router = express.Router();

// authentication routes
router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;
