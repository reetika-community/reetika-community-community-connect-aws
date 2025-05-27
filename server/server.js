require('dotenv').config();
const nodemailer = require('nodemailer');
const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;

app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});


