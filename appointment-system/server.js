// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Adjust CORS configuration based on environment
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-render-app-domain.onrender.com', 'https://health-and-counselling.netlify.app/'] 
    : 'http://localhost:5000',
  credentials: true
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Validate environment variables
const validateEnvVariables = () => {
  // Check for MongoDB URI
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in .env file");
    process.exit(1);
  }

  // Check for Fast2SMS API Key
  if (!process.env.FAST2SMS_API_KEY) {
    console.error("❌ Fast2SMS API key is not defined in .env file");
    console.error("Required variable: FAST2SMS_API_KEY");
    process.exit(1);
  }

  // JWT_SECRET is required for authentication
  if (!process.env.JWT_SECRET) {
    console.error("❌ JWT_SECRET is not defined in .env file");
    process.exit(1);
  }

  if (!process.env.PORT) {
    console.error("❌ PORT is not defined in .env file");
    process.exit(1);
  }

  // Check for admin credentials if in development mode
  if (process.env.NODE_ENV === 'development' && (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD)) {
    console.warn("⚠️ Warning: ADMIN_USERNAME and/or ADMIN_PASSWORD not defined in .env file");
  }
};

// Routes
app.use("/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/admin", adminRoutes);

// Root route redirects to login
app.get("/", (req, res) => {
  res.redirect("/auth/login");
});

// Error handling middleware
app.use(errorHandler);

// Start server
const startServer = async () => {
  validateEnvVariables();
  
  try {
    await connectDB();
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();