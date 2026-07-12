const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    technologies: [{ type: String }],
    features: [{ type: String }],
    githubLink: { type: String },
    liveLink: { type: String },
    caseStudy: { type: String },
    category: [{ type: String, enum: ['frontend', 'backend', 'fullstack', 'featured'] }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
