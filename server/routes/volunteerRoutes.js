const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');

// Register a new volunteer
router.post('/register', volunteerController.registerVolunteer);

const auth = require('../middleware/auth');
// Get all volunteers
router.get('/', auth, volunteerController.getAllVolunteers);

// Get all volunteers
// router.get('/', volunteerController.getAllVolunteers);

module.exports = router;
