const express = require('express');
const cors = require('cors'); // Import cors
const helmet = require('helmet'); // Import helmet
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const staffRoutes = require('./routes/staffRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();

// Connect to the Database
connectDB();

// Middleware
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(cors()); // Enable CORS for cross-origin requests
app.use(helmet()); // Enable Helmet for enhanced security

// Routes
app.use('/api/v1/auth', authRoutes); // Auth routes
app.use('/api/v1/admin', adminRoutes); // Admin routes
app.use('/api/v1/staff', staffRoutes); // Staff routes
app.use('/api/v1/vendor', vendorRoutes); // Vendor routes
app.use('/api/v1/products', productRoutes); // Product-related routes

// 404 Handler - catch all routes that are not defined
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Error Handler - global error handling middleware
app.use(errorHandler);

module.exports = app;
