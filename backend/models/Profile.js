const mongoose = require('mongoose');

// Singleton document — only one Profile should ever exist.
const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    taglines: [{ type: String }],
    about: { type: String },
    summary: { type: String },
    photoUrl: { type: String },
    resumeUrl: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    status: { type: String, default: 'Available For Work' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
