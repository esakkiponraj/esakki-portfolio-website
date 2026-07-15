const express = require('express');
const router = express.Router();
const { submitMessage, getMessages, markAsRead, deleteMessage } = require('../controllers/messageController');
const { protect } = require('../middlewares/authMiddleware');
const { contactValidation, validate } = require('../validators/messageValidator');
const { contactLimiter } = require('../middlewares/rateLimiter');

router.post('/', contactLimiter, contactValidation, validate, submitMessage); // public — used by /api/contact
router.get('/', protect, getMessages);
router.patch('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
