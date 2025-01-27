// src/config/db.js

const mongoose = require('mongoose');

// Load environment variables
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);

    // Exit process with failure
    process.exit(1);
  }
};

// Export the connectDB function
module.exports = connectDB;
