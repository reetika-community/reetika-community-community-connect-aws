require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const cors = require('cors');

const app = express();

connectDB();

// app.use(cors());
// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend's origin
    credentials: true // If you're using cookies or session-based authentication
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

module.exports = app;
