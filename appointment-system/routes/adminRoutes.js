// routes/adminRoutes.js
import express from "express";
import Appointment from "../models/Appointment.js";
import { authenticateUser, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Use authentication middleware for all admin routes
// Add 'debug' console.log to confirm middleware is running
console.log("Setting up admin routes with authentication middleware");
router.use(authenticateUser);
router.use(isAdmin);

// Admin Dashboard to view appointments
// In routes/adminRoutes.js
router.get("/appointments", authenticateUser, isAdmin, async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1, time: 1 });
    res.render('appointmentDashboard', { appointments });
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    res.status(500).send(`
      <html>
        <head><title>Error</title></head>
        <body>
          <h1>Error</h1>
          <p>Failed to load appointments. Please try again later.</p>
        </body>
      </html>
    `);
  }
});

export default router;