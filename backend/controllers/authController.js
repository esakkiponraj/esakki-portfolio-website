const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('../utils/asyncHandler');

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const isMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const token = generateToken(admin._id);
  res.json({
    success: true,
    token,
    admin: { id: admin._id, email: admin.email },
  });
});

// GET /api/auth/me — verify current token / fetch logged-in admin
const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, admin: req.admin });
});

module.exports = { login, getMe };
