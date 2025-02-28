import "dotenv/config"; // This loads environment variables from .env
import express from "express";
import { connect, Schema, model } from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { sendStatusNotification } from "./services/smsService.js";

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ensure MONGO_URI is set
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env file");
  process.exit(1); // Stop the server if the database URI is missing
}

// Ensure Twilio credentials are set
if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
  console.error("❌ Twilio credentials are not properly defined in .env file");
  console.error("Required variables: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER");
  process.exit(1);
}

// Connect to MongoDB
connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Appointment Schema
const appointmentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  appointmentType: { type: String, required: true },
  reason: { type: String },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'rejected', 'waiting'],
    default: 'pending'
  },
  notificationsSent: {
    confirmed: { type: Boolean, default: false },
    waiting: { type: Boolean, default: false },
    rejected: { type: Boolean, default: false }
  },
  createdAt: { type: Date, default: Date.now }
});

const Appointment = model("Appointment", appointmentSchema);

// API Route: Create Appointment
app.post("/api/appointments", async (req, res) => {
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

// API Route: Update Appointment Status
app.patch("/api/appointments/:id/status", async (req, res) => {
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

// HTML route: Admin Dashboard to view appointments
app.get("/admin/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1, time: 1 });

    // Create HTML content
    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Appointment Dashboard</title>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-100">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Appointment Dashboard</h1>
        
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
          <div class="p-4 bg-blue-500 text-white flex justify-between items-center">
            <h2 class="text-xl font-semibold">All Appointments</h2>
            <span class="bg-blue-700 px-3 py-1 rounded-full text-sm">${appointments.length} Total</span>
          </div>
          
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notification</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">`;

    appointments.forEach(appointment => {
      const formattedDate = new Date(appointment.date).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      // Generate status badge
      let statusBadge = '';
      switch (appointment.status) {
        case 'pending':
          statusBadge = `<span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>`;
          break;
        case 'confirmed':
          statusBadge = `<span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Confirmed</span>`;
          break;
        case 'rejected':
          statusBadge = `<span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Rejected</span>`;
          break;
        case 'waiting':
          statusBadge = `<span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Waiting</span>`;
          break;
        default:
          statusBadge = `<span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">${appointment.status}</span>`;
      }

      // Notification status
      let notificationStatus = 'N/A';

      if (
        ['confirmed', 'rejected', 'waiting'].includes(appointment.status) &&
        appointment.notificationsSent &&
        appointment.notificationsSent[appointment.status]
      ) {
        notificationStatus = `<span class="text-green-600">✓ Sent</span>`;
      } else if (['confirmed', 'rejected', 'waiting'].includes(appointment.status)) {
        notificationStatus = `<span class="text-red-600">Not Sent</span>`;
      }


      html += `
        <tr>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div>
                <div class="text-sm font-medium text-gray-900">${appointment.name}</div>
                <div class="text-sm text-gray-500">${appointment.email}</div>
                <div class="text-sm text-gray-500">${appointment.phone}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">${formattedDate}</div>
            <div class="text-sm text-gray-500">${appointment.time}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            ${appointment.appointmentType}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            ${statusBadge}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            ${notificationStatus}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div class="flex space-x-2">
              <button data-id="${appointment._id}" data-status="confirmed" class="status-btn text-green-600 hover:text-green-900">Confirm</button>
              <button data-id="${appointment._id}" data-status="waiting" class="status-btn text-blue-600 hover:text-blue-900">Wait</button>
              <button data-id="${appointment._id}" data-status="rejected" class="status-btn text-red-600 hover:text-red-900">Reject</button>
              ${(['confirmed', 'rejected', 'waiting'].includes(appointment.status) &&
          !appointment.notificationsSent?.[appointment.status]) ?
          `<button data-id="${appointment._id}" data-action="resend" class="resend-btn text-purple-600 hover:text-purple-900 ml-2">Resend</button>` : ''}
            </div>
          </td>
        </tr>`;
    });

    html += `
            </tbody>
          </table>
        </div>
      </div>
      
      <script>
        // Add event listeners to all status buttons
        document.querySelectorAll('.status-btn').forEach(button => {
          button.addEventListener('click', async function() {
            const id = this.getAttribute('data-id');
            const status = this.getAttribute('data-status');
            
            try {
              const response = await fetch(\`/api/appointments/\${id}/status\`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
              });
              
              if (response.ok) {
                // Refresh the page to see the updated status
                window.location.reload();
              } else {
                alert('Failed to update status. Please try again.');
              }
            } catch (error) {
              console.error('Error updating status:', error);
              alert('An error occurred. Please try again.');
            }
          });
        });
        
        // Add event listeners for resend buttons
        document.querySelectorAll('.resend-btn').forEach(button => {
          button.addEventListener('click', async function() {
            const id = this.getAttribute('data-id');
            
            try {
              const response = await fetch(\`/api/appointments/\${id}/resend-notification\`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              
              if (response.ok) {
                alert('SMS notification resent successfully');
                window.location.reload();
              } else {
                alert('Failed to resend notification. Please try again.');
              }
            } catch (error) {
              console.error('Error resending notification:', error);
              alert('An error occurred. Please try again.');
            }
          });
        });
      </script>
    </body>
    </html>`;

    res.send(html);
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

// API Route: Resend notification
app.post("/api/appointments/:id/resend-notification", async (req, res) => {
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

// API Route: Get All Appointments (JSON format still available)
app.get("/api/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// API Route: Get appointment by ID (for user to check status)
app.get("/api/appointments/:id", async (req, res) => {
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

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));