import twilio from 'twilio';
import 'dotenv/config';

// Create a Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// SMS templates for different status updates
const smsTemplates = {
  confirmed: (appointment) => {
    const date = new Date(appointment.date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    return `CONFIRMED: Hello ${appointment.name}, your appointment on ${date} at ${appointment.time} has been confirmed. Please arrive 10 minutes early. Reply HELP for assistance.`;
  },
  
  waiting: (appointment) => {
    const date = new Date(appointment.date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    return `WAITLIST: Hello ${appointment.name}, your appointment request for ${date} at ${appointment.time} has been placed on our waiting list. We'll notify you when a slot becomes available.`;
  },
  
  rejected: (appointment) => {
    const date = new Date(appointment.date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    return `UPDATE: Hello ${appointment.name}, we're unable to accommodate your appointment on ${date} at ${appointment.time}. Please call us to reschedule.`;
  },
};

// Function to send notification SMS
export const sendStatusNotification = async (appointment) => {
  console.log(`Attempting to send ${appointment.status} SMS to ${appointment.phone}`);

  try {
    if (!smsTemplates[appointment.status]) {
      console.log(`No SMS template for status: ${appointment.status}`);
      return;
    }

    // Log SMS configuration for debugging
    console.log('SMS Configuration:', {
      accountSid: process.env.TWILIO_ACCOUNT_SID ? '✓ Set' : '✗ Missing',
      authToken: process.env.TWILIO_AUTH_TOKEN ? '✓ Set' : '✗ Missing',
      fromNumber: process.env.TWILIO_PHONE_NUMBER || '✗ Missing'
    });

    const messageBody = smsTemplates[appointment.status](appointment);

    // Format phone number - removing any non-digit characters
    const formattedPhone = appointment.phone.replace(/\D/g, '');
    
    // Add country code if not present (assuming US +1)
    const phoneWithCountryCode = formattedPhone.length === 10 
      ? `+1${formattedPhone}` 
      : (formattedPhone.startsWith('+') ? formattedPhone : `+${formattedPhone}`);

    const message = await client.messages.create({
      body: messageBody,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneWithCountryCode
    });

    console.log(`✅ SMS sent to ${appointment.phone}: ${message.sid}`);
    return message;
  } catch (error) {
    console.error('❌ Error sending SMS notification:', error);
    throw error;
  }
};

export default { sendStatusNotification };