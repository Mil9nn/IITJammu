// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.auth_token;

    if (!token) {
      if (req.xhr || req.path.startsWith('/api/')) {
        return res.status(401).json({ message: "Authentication required" });
      }
      console.log("No authentication token found, redirecting to login");
      // In authenticateUser middleware when redirecting
      return res.redirect('/auth/login?from=' + encodeURIComponent(req.originalUrl));
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log("User authenticated:", decoded.id);
      next();
    } catch (jwtError) {
      console.error("Invalid token:", jwtError.message);
      res.clearCookie('auth_token');
      // In authenticateUser middleware when redirecting
      return res.redirect('/auth/login?from=' + encodeURIComponent(req.originalUrl));
    }
  } catch (error) {
    console.error("❌ Authentication error:", error);
    res.redirect('/auth/login');
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user) {
    console.log("User object not found in request, redirecting to login");
    // In authenticateUser middleware when redirecting
    return res.redirect('/auth/login?from=' + encodeURIComponent(req.originalUrl));
  }

  if (req.user.isAdmin) {
    next();
  } else {
    console.log("Non-admin user attempted to access restricted route");
    res.status(403).send("Access denied: Admin privileges required");
  }
};