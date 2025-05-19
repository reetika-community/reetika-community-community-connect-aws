const Volunteer = require('../models/Volunteer');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Register Volunteer
exports.registerVolunteer = async (req, res) => {
  const { name, email, password, skills } = req.body;
  try {
    let existing = await Volunteer.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const volunteer = new Volunteer({ name, email, skills, password: hashedPassword });
    await volunteer.save();

    const token = jwt.sign({ id: volunteer._id, role: 'volunteer' }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, volunteer: { id: volunteer._id, name, email, skills } });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Register Admin
exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();

    const token = jwt.sign({ id: admin._id, role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, admin: { id: admin._id, name, email } });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Login Volunteer or Admin
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Try Volunteer first
    let user = await Volunteer.findOne({ email });
    let role = 'volunteer';

    if (!user) {
      // Try Admin
      user = await Admin.findOne({ email });
      role = 'admin';
    }

    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: user._id, email: user.email, name: user.name, role } });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
