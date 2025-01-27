// src/server.js

const app = require('./app');  // Import the app from app.js
require('dotenv').config();  // Load environment variables

const PORT = process.env.PORT || 5000;  // Set the port from .env or default to 5000

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);  // Log the server start message
});
