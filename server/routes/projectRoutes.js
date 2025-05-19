const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createProject, getProjects, applyToProject, updateApplicationStatus } = require('../controllers/projectController');

// Anyone authenticated can get projects
router.get('/', auth(), getProjects);

// Admin only creates projects
router.post('/', auth('admin'), createProject);

// Volunteer applies
router.post('/:projectId/apply', auth('volunteer'), applyToProject);

// Admin updates application status
router.put('/applications/:applicationId', auth('admin'), updateApplicationStatus);

module.exports = router;
