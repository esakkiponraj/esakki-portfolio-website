const ContactInfo = require('../models/ContactInfo');
const asyncHandler = require('../utils/asyncHandler');
const cache = require('../utils/cache');

// GET /api/contact-info — public
const getContactInfo = asyncHandler(async (req, res) => {
  const cached = cache.get('contactInfo');
  if (cached) {
    return res.json(cached);
  }
  let info = await ContactInfo.findOne().lean();
  if (!info) {
    info = await ContactInfo.create({
      phone: '+91 9342520682',
      email: 'mesakkiponraj@gmail.com',
      address: 'Cheranmahadevi, Tirunelveli, Tamil Nadu, India',
    });
  }
  const result = { success: true, data: info };
  cache.set('contactInfo', result);
  res.json(result);
});

// PUT /api/contact-info — admin only
const updateContactInfo = asyncHandler(async (req, res) => {
  let info = await ContactInfo.findOne();
  if (!info) {
    info = await ContactInfo.create(req.body);
  } else {
    info = await ContactInfo.findByIdAndUpdate(info._id, req.body, { new: true, runValidators: true });
  }
  cache.del('contactInfo');
  cache.del('portfolio_bundle');
  res.json({ success: true, data: info });
});

module.exports = { getContactInfo, updateContactInfo };
