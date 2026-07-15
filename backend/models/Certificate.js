const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['internship', 'course', 'achievement'], required: true },
    title: { type: String, required: true },
    organization: { type: String },
    duration: { type: String },
    description: { type: String },
    fileUrl: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Certificate', certificateSchema);
