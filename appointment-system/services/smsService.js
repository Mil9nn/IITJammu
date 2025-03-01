import fetch from 'node-fetch';
import 'dotenv/config';

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

// Function to send notification SMS using Fast2SMS
export const sendStatusNotification = async (appointment) => {
  console.log(`Attempting to send ${appointment.status} SMS to ${appointment.phone}`);

  try {
    if (!smsTemplates[appointment.status]) {
      console.log(`No SMS template for status: ${appointment.status}`);
      return;
    }

    // Log SMS configuration for debugging
    console.log('SMS Configuration:', {
      apiKey: process.env.FAST2SMS_API_KEY ? '✓ Set' : '✗ Missing',
    });

    const messageBody = smsTemplates[appointment.status](appointment);

    // Format phone number - removing any non-digit characters
    const formattedPhone = appointment.phone.replace(/\D/g, '');
    
    // Ensure the phone number is a 10-digit Indian number
    if (formattedPhone.length !== 10) {
      throw new Error(`Invalid phone number: ${appointment.phone}. Must be a 10-digit Indian number.`);
    }

    // Fast2SMS API endpoint
    const url = 'https://www.fast2sms.com/dev/bulkV2';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.FAST2SMS_API_KEY,
      },
      body: JSON.stringify({
        route: 'q', // Use 'q' for promotional SMS or 'otp' for OTP messages
        message: messageBody,
        language: 'english', // Language of the message
        numbers: formattedPhone, // Recipient's phone number (10-digit Indian number)
      }),
    });

    const result = await response.json();

    if (result.return === true) {
      console.log(`✅ SMS sent to ${formattedPhone}:`, result.request_id);
    } else {
      console.error('❌ Error sending SMS:', result.message);
    }

    return result;
  } catch (error) {
    console.error('❌ Error sending SMS notification:', error);
    throw error;
  }
};

export default { sendStatusNotification };