require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const cors = require('cors');

const app = express();

connectDB();
//-------------------

// Existing middleware and routes...

// ✅ ALB health check route
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

//--------------------
// app.use(cors());
// Use CORS middleware
app.use(cors({
    origin: 'd35nkvkwxhw2yr.cloudfront.net', // Allow requests from your frontend's origin
    credentials: true // If you're using cookies or session-based authentication
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

module.exports = app;
