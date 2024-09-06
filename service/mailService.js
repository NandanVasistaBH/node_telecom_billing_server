import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Create transporter with non-SSL settings and custom port
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,  
  port: process.env.SMTP_PORT,  // e.g., 25 for non-SSL, 587 for STARTTLS, or 465 for SSL
  secure: process.env.SMTP_SECURE === 'true',  // true for SSL, false for non-SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED === 'true',  // false if you want to allow self-signed certificates
  },
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    // Send email
    console.log("mail options " + sendEmail)
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

export default sendEmail;
