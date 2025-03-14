# React + Vite

# EmailJS Setup Guide for Ask the Counselor Section

This guide explains how to integrate EmailJS with the **Ask the Counselor** section of your wellness center website.

## 1. Create an EmailJS Account
1. Visit [EmailJS](https://www.emailjs.com/).
2. Click **Create Free Account**.
3. Enter your details and sign up.

## 2. Set Up an Email Service
4. Click **Add New Service** → **Connect Account** → **Create Service**.
5. Copy the **Service ID**.

## 3. Create an Email Template
6. Go to **Email Templates** in the dashboard.
7. Click **Create New Template** → **Create Template**.
8. Click **Edit Content** → **Code Editor** and paste the following template:

```html
<!DOCTYPE html>
<html>
<head>
    <title>New Counselor Question</title>
</head>
<body>
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
    <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #4a86e8;">
      <h1 style="color: #4a86e8; margin: 0;">New Counseling Question</h1>
    </div>
    
    <div style="padding: 20px 0;">
      <p style="font-size: 16px; color: #333;"><strong>From:</strong> {{email}}</p>
      <p style="font-size: 16px; color: #333;"><strong>Date:</strong> {{timestamp}}</p>
      
      <div style="margin-top: 30px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #4a86e8; border-radius: 3px;">
        <h3 style="margin-top: 0; color: #4a86e8;">Question:</h3>
        <p style="font-size: 16px; color: #333; line-height: 1.5;">{{question}}</p>
      </div>
    </div>
    
    <div style="padding-top: 20px; border-top: 1px solid #eaeaea; text-align: center; font-size: 14px; color: #888;">
      <p>This message was sent from the Ask the Counselor form on your wellness platform.</p>
      <p>Please respond to the student if they have provided an email address.</p>
    </div>
  </div>
</body>
</html>
```

## 4. Configure Email Settings
9. **To Email**: Enter your email address.
10. **From Email**: Use the default email address (**checked**).
11. Click **Save**.
12. Copy the **Template ID**.

## 5. Retrieve API Keys
13. On the **Home Page**, click your name at the top → Copy the **Public Key (User ID)**.
14. Now you have:
    - **Service ID**
    - **Template ID**
    - **Public Key**

## 6. Update Environment Variables
15. Add these credentials to the `.env` file in the root directory:
    ```env
    REACT_APP_EMAILJS_SERVICE_ID=your_service_id
    REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
    REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
    ```

## Conclusion
Your EmailJS setup for the **Ask the Counselor** section is now complete! 🎉