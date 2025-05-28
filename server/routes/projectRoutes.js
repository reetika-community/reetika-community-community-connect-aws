const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createProject,deleteProjectById,  getProjectById, getProjects, applyToProject, updateApplicationStatus } = require('../controllers/projectController');

// Anyone authenticated can get projects

router.get('/', auth(), getProjects);

// Admin only creates projects
router.post('/', auth('admin'), createProject);

router.get('/:projectId', auth(), getProjectById);

router.delete('/:projectId', auth('admin'), deleteProjectById);

// Volunteer applies
router.post('/:projectId/apply', auth('volunteer'), applyToProject);

// Admin updates application status
router.put('/applications/:applicationId', auth('admin'), updateApplicationStatus);



module.exports = router;
