const express = require('express');
const router = express.Router();
const { login, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { loginValidation, validate } = require('../validators/authValidator');
const { loginLimiter } = require('../middlewares/rateLimiter');

router.post('/login', loginLimiter, loginValidation, validate, login);
router.get('/me', protect, getMe);

module.exports = router;
