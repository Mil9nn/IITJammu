// routes/adminRoutes.js
import express from "express";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import { authenticateUser, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Use authentication middleware for all admin routes
console.log("Setting up admin routes with authentication middleware");
router.use(authenticateUser);
router.use(isAdmin);

// Admin Dashboard to view appointments
router.get("/appointments", async (req, res) => {
  try {
    const adminId = req.user.id;
    
    // Find appointments assigned to this admin, or unassigned
    const appointments = await Appointment.find({
      $or: [
        { assignedAdmin: adminId },
        { assignedAdmin: null }
      ]
    }).sort({ date: 1, time: 1 });

    // Get admin name for the dashboard
    const admin = await User.findById(adminId);
    
    res.render('appointmentDashboard', { 
      appointments,
      adminName: admin.adminName || admin.username
    });
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

// Admin list page
router.get("/admin-list", async (req, res) => {
  try {
    const admins = await User.find({ isAdmin: true })
                            .select('username adminName createdAt');
    
    res.render('adminList', { admins });
  } catch (error) {
    console.error("❌ Error fetching admin list:", error);
    res.status(500).json({ message: "Failed to load admin list" });
  }
});

export default router;