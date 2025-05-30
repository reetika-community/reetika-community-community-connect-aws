// require('dotenv').config();
const mongoose = require('mongoose');
MONGO_URI="mongodb+srv://reetikauser:test1234@cluster0.vdqw1ua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
