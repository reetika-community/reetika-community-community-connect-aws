const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/adminAuth');

// Routes
router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/applications', auth, adminController.getAllApplications);
router.patch('/applications/:id/status', auth, adminController.updateApplicationStatus);

module.exports = router;
