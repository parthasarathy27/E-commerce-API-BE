// src/config/env.js

// Load environment variables
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000, // Default to 5000 if PORT is not defined
  dbUrl: process.env.DB_URL,      // MongoDB connection URL
  jwtSecret: process.env.JWT_SECRET, // Secret for signing JWTs
};
