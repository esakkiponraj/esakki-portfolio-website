const mongoose = require('mongoose');

// Singleton — editable contact details shown on the public Contact page.
const contactInfoSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
