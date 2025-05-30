import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//--------------------------------------
const AWS = require('aws-sdk');

// Load credentials from IAM role or EC2 instance profile
const ssm = new AWS.SSM({ region: 'your-region' });

async function getEnvVar(name) {
  const result = await ssm.getParameter({
    Name: name,
    WithDecryption: true
  }).promise();

  return result.Parameter.Value;
}

// Example usage
(async () => {
  const mongoUri = await getEnvVar('/community-connect/MONGO_URI');
  const jwtSecret = await getEnvVar('/community-connect/JWT_SECRET');

  // Now use these variables to connect to MongoDB or set in process.env
  process.env.MONGO_URI = mongoUri;
  process.env.JWT_SECRET = jwtSecret;
})();




//-----------------------------------
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

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
