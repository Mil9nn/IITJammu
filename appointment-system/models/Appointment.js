import { Schema, model } from "mongoose";

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
    enum: ["pending", "confirmed", "rejected", "waiting"],
    default: "pending",
  },
  notificationsSent: {
    confirmed: { type: Boolean, default: false },
    waiting: { type: Boolean, default: false },
    rejected: { type: Boolean, default: false },
  },
  createdAt: { type: Date, default: Date.now },

  // Expiry date field (Only set for confirmed appointments)
  expiryDate: { type: Date, expires: 10 }, // 7 days in seconds
});

// Middleware to set expiryDate when appointment is confirmed
appointmentSchema.pre("save", function (next) {
  if (this.status === "confirmed" && !this.expiryDate) {
    this.expiryDate = new Date();
    this.expiryDate.setDate(this.expiryDate.getDate() + 7); // 7 days from confirmation
  }
  next();
});

const Appointment = model("Appointment", appointmentSchema);
export default Appointment;