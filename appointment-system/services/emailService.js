import nodemailer from 'nodemailer';
import 'dotenv/config';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,       // SMTP host (e.g., smtp.gmail.com)
  port: process.env.EMAIL_PORT,       // SMTP port (e.g., 587)
  secure: false,                      // true for 465 (SSL), false for other ports
  auth: {
    user: process.env.EMAIL_USER,     // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app password
  },
});

// Email templates for different status updates
const emailTemplates = {
  confirmed: (appointment) => ({
    subject: 'Your Appointment Has Been Confirmed',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #4CAF50;">Appointment Confirmed</h2>
        <p>Dear ${appointment.name},</p>
        <p>We're pleased to confirm your appointment:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>Date:</strong> ${new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <p><strong>Time:</strong> ${appointment.time}</p>
          <p><strong>Type:</strong> ${appointment.appointmentType}</p>
          ${appointment.reason ? `<p><strong>Reason:</strong> ${appointment.reason}</p>` : ''}
        </div>
        <p>Please arrive 10 minutes before your scheduled time. If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
        <p>Thank you for choosing our services.</p>
        <p>Best regards,<br>Appointment Team</p>
      </div>
    `,
  }),
  // Add other templates for 'waiting' and 'rejected' statuses
};

// Function to send notification emails
export const sendStatusNotification = async (appointment) => {
  try {
    if (!emailTemplates[appointment.status]) {
      console.log(`No email template for status: ${appointment.status}`);
      return;
    }

    const { subject, html } = emailTemplates[appointment.status](appointment);

    const mailOptions = {
      from: `"Appointment System" <${process.env.EMAIL_FROM}>`, // Sender email from .env
      to: appointment.email, // User's email from the input field
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${appointment.email}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('❌ Error sending email notification:', error);
    throw error;
  }
};

export default { sendStatusNotification };