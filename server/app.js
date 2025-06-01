require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS (CloudFront or local frontend)
app.use(cors({
  origin: 'https://d35nkvkwxhw2yr.cloudfront.net', // <-- add https:// if needed
  credentials: true
}));

// CSP Middleware (should come before routes)
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy",
    "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com; script-src 'self'");
  next();
});

// JSON parser
app.use(express.json());

// ALB Health check route or default root route
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

// Your API routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Catch-all 404 (Optional)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
