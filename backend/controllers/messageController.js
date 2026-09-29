const Message = require('../models/Message');
const asyncHandler = require('../utils/asyncHandler');
const { sendNotificationEmail, sendConfirmationEmail } = require('../services/emailService');

// POST /api/contact — public. This is the contact form submission flow:
// 1. Save to MongoDB (source of truth — the message is never lost)
// 2. Send notification email to the site owner
// 3. Send confirmation email back to the visitor
// Step 2 is treated as required (the owner must know about the message),
// step 3 is best-effort — a failed "thank you" email shouldn't block the
// visitor from seeing a success response, since their message was received.
const submitMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
  }

  const savedMessage = await Message.create({ name, email, subject, message });

  // 1. Immediately respond to client so the UI never hangs on "Sending..."
  res.status(201).json({
    success: true,
    message: 'Thank you for reaching out. I have received your message and will get back to you shortly.',
    data: { id: savedMessage._id },
  });

  // 2. Dispatch emails in parallel in the background without blocking the user
  (async () => {
    try {
      const [notifResult, confResult] = await Promise.allSettled([
        sendNotificationEmail({ name, email, subject, message }),
        sendConfirmationEmail({ name, email }),
      ]);

      const notificationEmailSent = notifResult.status === 'fulfilled';
      const confirmationEmailSent = confResult.status === 'fulfilled';

      if (!notificationEmailSent && notifResult.reason) {
        console.error('Failed to send notification email:', notifResult.reason?.message || notifResult.reason);
      }
      if (!confirmationEmailSent && confResult.reason) {
        console.error('Failed to send confirmation email:', confResult.reason?.message || confResult.reason);
      }

      await Message.findByIdAndUpdate(savedMessage._id, {
        notificationEmailSent,
        confirmationEmailSent,
      });
    } catch (err) {
      console.error('Background email task error:', err.message);
    }
  })();
});

// GET /api/messages — admin only
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json({ success: true, count: messages.length, data: messages });
});

// PATCH /api/messages/:id/read — admin only
const markAsRead = asyncHandler(async (req, res) => {
  const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
  res.json({ success: true, data: msg });
});

// DELETE /api/messages/:id — admin only
const deleteMessage = asyncHandler(async (req, res) => {
  const msg = await Message.findByIdAndDelete(req.params.id);
  if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
  res.json({ success: true, message: 'Message deleted' });
});

module.exports = { submitMessage, getMessages, markAsRead, deleteMessage };
