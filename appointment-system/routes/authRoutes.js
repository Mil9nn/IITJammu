// routes/authRoutes.js
import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";

const router = express.Router();

// Registration route (usually restricted in production)
router.post("/register", registerUser);

// Login routes
router.get("/login", (req, res) => {
  res.render('login');
});
router.post("/login", loginUser);

// Logout route
router.get("/logout", logoutUser);

export default router;