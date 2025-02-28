import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// Admin Dashboard to view appointments
router.get("/appointments", async (req, res) => {
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