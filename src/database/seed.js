const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config(); // Load environment variables

// Database connection
const connectDB = require('../config/db');
connectDB();

// Seed function to add a default Super-Admin
const seed = async () => {
    try {
        // Check if the Super-Admin already exists
        const superAdmin = await User.findOne({ email: 'superadmin@example.com' });

        if (superAdmin) {
            console.log('Super Admin already exists!');
            return;
        }

        // Hash password for the Super Admin
        const hashedPassword = await bcrypt.hash('SuperAdmin123', 10);

        // Create a Super Admin user
        const superAdminUser = new User({
            username: 'Super Admin',
            email: 'superadmin@example.com',
            password: hashedPassword,
            role: 'admin', // Assign admin role
        });

        // Save the Super Admin user
        await superAdminUser.save();
        console.log('Super Admin created successfully!');
    } catch (error) {
        console.error('Error while seeding the database:', error.message);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
};

// Run the seed function
seed();
