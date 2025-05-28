const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: [String],
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
   appliedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
}, { timestamps: true });

module.exports = mongoose.model('Volunteer', volunteerSchema);
