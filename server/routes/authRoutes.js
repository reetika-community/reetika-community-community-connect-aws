const express = require('express');
const router = express.Router();
const { registerVolunteer, registerAdmin, login } = require('../controllers/authController');

router.post('/register/volunteer', registerVolunteer);
router.post('/register/admin', registerAdmin);
router.post('/login', login);

module.exports = router;
