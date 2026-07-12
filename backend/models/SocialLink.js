const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true, enum: ['github', 'linkedin', 'email', 'portfolio', 'twitter', 'other'] },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SocialLink', socialLinkSchema);
