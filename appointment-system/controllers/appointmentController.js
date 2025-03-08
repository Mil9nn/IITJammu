import Appointment from "../models/Appointment.js";
import { sendStatusNotification, sendAdminNotification } from "../services/emailService.js";

// Create Appointment
export const createAppointment = async (req, res) => {
  try {
    const { name, email, phone, date, time, appointmentType, reason } = req.body;

    // Check for existing appointment
    const existingAppointment = await Appointment.findOne({ date: new Date(date), time });
    if (existingAppointment) {
      return res.status(409).json({ message: "This time slot is already booked." });
    }

    const newAppointment = new Appointment({ name, email, phone, date, time, appointmentType, reason });
    await newAppointment.save();

    // Send admin notification about new appointment
    try {
      await sendAdminNotification(newAppointment);
      console.log('✅ Admin notification sent successfully');
    } catch (notificationError) {
      console.error('❌ Error sending admin notification:', notificationError);
      // Continue even if notification fails
    }

    res.status(201).json({ message: "✅ Appointment booked successfully!" });
  } catch (error) {
    console.error('❌ Error creating appointment:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Appointment Status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    appointment.status = status;
    await appointment.save();

    // If status is one of these, send notification
    if (['confirmed', 'waiting', 'rejected'].includes(status)) {
      try {
        await sendStatusNotification(appointment);
      } catch (notificationError) {
        console.error(`❌ Error sending status notification: ${notificationError.message}`);
      }
    }

    res.status(200).json({ message: `Appointment status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Resend Notification
export const resendNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    await sendStatusNotification(appointment);
    res.status(200).json({ message: "Notification resent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Appointment by ID
export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Render Admin Dashboard
export const renderAdminDashboard = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1, time: 1 });
    res.render("adminDashboard", { appointments });
  } catch (error) {
    res.status(500).send("Error fetching appointments");
  }
};