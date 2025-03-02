// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.auth_token;
    
    if (!token) {
      return res.redirect('/auth/login');
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error("❌ Authentication error:", error);
    res.redirect('/auth/login');
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).send("Access denied: Admin privileges required");
  }
};