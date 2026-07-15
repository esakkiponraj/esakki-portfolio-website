const nodemailer = require('nodemailer');

// Uses any SMTP provider — Gmail, SendGrid, Mailgun, etc.
// Set these in .env: EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: Number(process.env.EMAIL_PORT) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// Email sent to the site owner (admin) when a visitor submits the contact form.
async function sendNotificationEmail({ name, email, subject, message }) {
  const transporter = createTransporter();
  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: email,
    subject: `New Portfolio Message: ${subject}`,
    html: `
      <div style="font-family: sans-serif; max-width: 500px;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Date & Time:</strong> ${submittedAt}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
    `,
  });
}

// Confirmation email sent back to the visitor who submitted the form.
async function sendConfirmationEmail({ name, email }) {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"Esakki Ponraj M" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Thank You For Contacting Me',
    html: `
      <div style="font-family: sans-serif; max-width: 500px;">
        <p>Hi ${name},</p>
        <p>Thank you for reaching out. I have received your message and will get back to you shortly.</p>
        <p>Best regards,<br/>Esakki Ponraj M</p>
      </div>
    `,
  });
}

module.exports = { sendNotificationEmail, sendConfirmationEmail };
