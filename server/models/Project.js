const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  requiredSkills: [String],
  volunteersNeeded: Number,
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
