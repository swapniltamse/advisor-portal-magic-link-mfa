const nodemailer = require("nodemailer");

// Configure email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const sendPasswordResetEmail = async (user, resetUrl) => {
  const transporter = createTransporter();

  const mailOptions = {
    to: user.email,
    subject: "Password Reset for Insurance Advisor Portal",
    html: `
      <h1>Password Reset</h1>
      <p>Hello ${user.name},</p>
      <p>You requested a password reset for your Insurance Advisor Portal account.</p>
      <p>Click the link below to reset your password. This link is valid for 1 hour.</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

console.log("SMTP Config:", {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  passLength: process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 0,
});

module.exports = {
  sendPasswordResetEmail,
};
