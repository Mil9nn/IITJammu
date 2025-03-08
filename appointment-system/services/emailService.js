import 'dotenv/config';

// Email templates for different status updates
const emailTemplates = {
  confirmed: (appointment) => {
    const date = new Date(appointment.date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    return {
      subject: `Appointment Confirmed - ${date}`,
      text: `CONFIRMED: Hello ${appointment.name}, your appointment on ${date} at ${appointment.time} has been confirmed. Please arrive 10 minutes early. If you need assistance, please reply to this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #4CAF50;">Appointment Confirmed</h2>
          <p>Hello ${appointment.name},</p>
          <p>Your appointment on <strong>${date}</strong> at <strong>${appointment.time}</strong> has been confirmed.</p>
          <p>Please arrive 10 minutes early.</p>
          <p>If you need assistance, please reply to this email.</p>
          <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      `
    };
  },
  
  waiting: (appointment) => {
    const date = new Date(appointment.date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    return {
      subject: `Appointment Waitlisted - ${date}`,
      text: `WAITLIST: Hello ${appointment.name}, your appointment request for ${date} at ${appointment.time} has been placed on our waiting list. We'll notify you when a slot becomes available.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #FF9800;">Appointment Waitlisted</h2>
          <p>Hello ${appointment.name},</p>
          <p>Your appointment request for <strong>${date}</strong> at <strong>${appointment.time}</strong> has been placed on our waiting list.</p>
          <p>We'll notify you when a slot becomes available.</p>
          <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      `
    };
  },
  
  rejected: (appointment) => {
    const date = new Date(appointment.date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    return {
      subject: `Appointment Update - ${date}`,
      text: `UPDATE: Hello ${appointment.name}, we're unable to accommodate your appointment on ${date} at ${appointment.time}. Please call us to reschedule.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #F44336;">Appointment Update</h2>
          <p>Hello ${appointment.name},</p>
          <p>We're unable to accommodate your appointment on <strong>${date}</strong> at <strong>${appointment.time}</strong>.</p>
          <p>Please call us to reschedule.</p>
          <p style="margin-top: 20px; font-size: 12px; color: #888;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      `
    };
  },
};

// Function to send notification email using EmailJS
export const sendStatusNotification = async (appointment) => {
  console.log(`Attempting to send ${appointment.status} email to ${appointment.email}`);

  try {
    if (!emailTemplates[appointment.status]) {
      console.log(`No email template for status: ${appointment.status}`);
      return;
    }

    // Log EmailJS configuration for debugging
    console.log('EmailJS Configuration:', {
      serviceId: process.env.EMAILJS_SERVICE_ID ? '✓ Set' : '✗ Missing',
      templateId: process.env.EMAILJS_TEMPLATE_ID ? '✓ Set' : '✗ Missing',
      userId: process.env.EMAILJS_USER_ID ? '✓ Set' : '✗ Missing',
    });

    // Get the appropriate template for the appointment status
    const emailContent = emailTemplates[appointment.status](appointment);

    // Prepare the data to send to EmailJS
    const data = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_USER_ID,
      template_params: {
        to_email: appointment.email,
        to_name: appointment.name,
        subject: emailContent.subject,
        message: emailContent.text,
        html_message: emailContent.html,
      }
    };

    // Make the API request to EmailJS
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      console.log(`✅ Email sent to ${appointment.email} for ${appointment.status} status`);
      return { success: true };
    } else {
      console.error('❌ Error sending email:', await response.text());
      return { success: false, error: response.statusText };
    }
  } catch (error) {
    console.error('❌ Error sending email notification:', error);
    throw error;
  }
};

export default { sendStatusNotification };