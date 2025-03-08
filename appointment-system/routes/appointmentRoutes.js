import express from "express";
import Appointment from "../models/Appointment.js";
import { sendStatusNotification } from "../services/emailService.js";
import { authenticateUser, isAdmin } from "../middleware/authMiddleware.js";

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

// Assign appointment to an admin
router.patch("/:id/assign", authenticateUser, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.id;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Assign the appointment to the current admin
    appointment.assignedAdmin = adminId;
    await appointment.save();

    res.status(200).json({
      message: "Appointment assigned successfully",
      appointment
    });
  } catch (error) {
    console.error("Error assigning appointment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update Appointment Status
router.patch("/:id/status", authenticateUser, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const adminId = req.user.id;

    if (!['pending', 'confirmed', 'rejected', 'waiting'].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if the appointment is assigned to this admin or not assigned to anyone
    if (appointment.assignedAdmin && !appointment.assignedAdmin.equals(adminId)) {
      return res.status(403).json({ message: "You are not authorized to update this appointment" });
    }

    // Assign appointment to this admin if not already assigned
    if (!appointment.assignedAdmin) {
      appointment.assignedAdmin = adminId;
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

// Other routes remain the same...

// Get All Appointments (admin-only, filtered by admin assignment)
router.get("/", authenticateUser, isAdmin, async (req, res) => {
  try {
    const adminId = req.user.id;
    
    // Find appointments assigned to this admin, or unassigned
    const appointments = await Appointment.find({
      $or: [
        { assignedAdmin: adminId },
        { assignedAdmin: null }
      ]
    });
    
    res.status(200).json(appointments);
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;