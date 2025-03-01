import express from "express";
import Appointment from "../models/Appointment.js";
import { sendStatusNotification } from "../services/smsService.js";

const router = express.Router();

// Create Appointment
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, date, time, appointmentType, reason, status = "pending" } = req.body;

    if (!name || !email || !phone || !date || !time || !appointmentType) {
      return res.status(400).json({ message: "All fields except reason are required." });
    }

    // Check for existing appointment at this time
    const existingAppointment = await Appointment.findOne({
      date: new Date(date),
      time
    });

    if (existingAppointment) {
      return res.status(409).json({ message: "This time slot is already booked." });
    }

    const newAppointment = new Appointment({
      name,
      email,
      phone,
      date: new Date(date),
      time,
      appointmentType,
      reason,
      status
    });
    await newAppointment.save();

    res.status(201).json({ message: "✅ Appointment booked successfully!" });
  } catch (error) {
    console.error("❌ Error saving appointment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update Appointment Status
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'rejected', 'waiting'].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Only update if status is actually changing
    if (appointment.status !== status) {
      // Update the status
      appointment.status = status;

      // Check if we need to send a notification for this status
      let notificationSent = false;
      
      if (['confirmed', 'rejected', 'waiting'].includes(status)) {
        try {
          // Send SMS notification
          await sendStatusNotification(appointment);
          
          // Mark this notification as sent
          appointment.notificationsSent[status] = true;
          notificationSent = true;
          console.log(`✅ SMS notification marked as sent for ${id} with status ${status}`);
        } catch (smsError) {
          console.error(`❌ Error sending ${status} SMS to ${appointment.phone}:`, smsError);
          // Continue with saving the appointment even if SMS fails, but don't mark as sent
        }
      }

      // Save the updated appointment
      await appointment.save();
      
      res.status(200).json({
        message: `Appointment status updated to ${status}`,
        appointment,
        notificationSent
      });
    } else {
      res.status(200).json({
        message: `Appointment already in ${status} status`,
        appointment,
        notificationSent: appointment.notificationsSent[status] || false
      });
    }
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Resend notification
router.post("/:id/resend-notification", async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (!['confirmed', 'rejected', 'waiting'].includes(appointment.status)) {
      return res.status(400).json({
        message: "Notifications can only be sent for confirmed, rejected, or waiting appointments"
      });
    }

    try {
      // Send SMS notification
      await sendStatusNotification(appointment);

      // Mark this notification as sent
      appointment.notificationsSent[appointment.status] = true;
      await appointment.save();

      res.status(200).json({
        message: `SMS notification for ${appointment.status} status sent successfully`
      });
    } catch (smsError) {
      console.error("❌ Error sending SMS notification:", smsError);
      res.status(500).json({ message: "Failed to send SMS notification" });
    }
  } catch (error) {
    console.error("Error resending notification:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get All Appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get appointment by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error("❌ Error fetching appointment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;