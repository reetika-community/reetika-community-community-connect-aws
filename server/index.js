import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Simple API route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express API!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


const path = require("path");
const _dirname = path.dirname("");
const buildpath = path.join(_dirname,"../client/build");
// appendFile.use(XPathExpression.s)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
