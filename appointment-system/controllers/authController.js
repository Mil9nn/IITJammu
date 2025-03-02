// controllers/authController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Register User (for initial admin setup)
export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    
    // Create new user
    const newUser = new User({ username, password });
    await newUser.save();
    
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    // Set cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    // Redirect to admin dashboard
    res.redirect('/admin/appointments');
  } catch (error) {
    console.error("❌ Error logging in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout User
export const logoutUser = (req, res) => {
  res.clearCookie('auth_token');
  res.redirect('/auth/login');
};