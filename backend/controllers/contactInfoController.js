const ContactInfo = require('../models/ContactInfo');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/contact-info — public
const getContactInfo = asyncHandler(async (req, res) => {
  let info = await ContactInfo.findOne();
  if (!info) {
    info = await ContactInfo.create({
      phone: '+91 9342520682',
      email: 'mesakkiponraj@gmail.com',
      address: 'Cheranmahadevi, Tirunelveli, Tamil Nadu, India',
    });
  }
  res.json({ success: true, data: info });
});

// PUT /api/contact-info — admin only
const updateContactInfo = asyncHandler(async (req, res) => {
  let info = await ContactInfo.findOne();
  if (!info) {
    info = await ContactInfo.create(req.body);
  } else {
    info = await ContactInfo.findByIdAndUpdate(info._id, req.body, { new: true, runValidators: true });
  }
  res.json({ success: true, data: info });
});

module.exports = { getContactInfo, updateContactInfo };
