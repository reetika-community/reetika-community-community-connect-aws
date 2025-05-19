const Project = require('../models/Project');
const Application = require('../models/Application');
const Volunteer = require('../models/Volunteer');
const { sendEmail } = require('../utils/emailService');

exports.createProject = async (req, res) => {
  const { title, description, location, requiredSkills, volunteersNeeded } = req.body;
  try {
    const project = new Project({ title, description, location, requiredSkills, volunteersNeeded });
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Volunteer applies to project
exports.applyToProject = async (req, res) => {
  const volunteerId = req.user.id;
  const projectId = req.params.projectId;

  try {
    // Prevent duplicate applications
    const existingApplication = await Application.findOne({ volunteer: volunteerId, project: projectId });
    if (existingApplication) return res.status(400).json({ msg: 'Already applied' });

    const application = new Application({ volunteer: volunteerId, project: projectId });
    await application.save();

    // Add application ref to project
    await Project.findByIdAndUpdate(projectId, { $push: { applications: application._id } });

    res.json(application);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Admin manages applications: accept/reject
exports.updateApplicationStatus = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body; // 'Accepted' or 'Rejected'

  try {
    const application = await Application.findById(applicationId).populate('volunteer project');
    if (!application) return res.status(404).json({ msg: 'Application not found' });

    application.status = status;
    await application.save();

    // Send email notification
    const toEmail = application.volunteer.email;
    const subject = `Application ${status} - ${application.project.title}`;
    const body = `Hello ${application.volunteer.name}, your application for the project "${application.project.title}" has been ${status}.`;

    await sendEmail(toEmail, subject, body);

    res.json(application);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
