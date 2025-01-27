const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

// Public Routes
router.post('/signup', signup);  // Signup endpoint
router.post('/login', login);    // Login endpoint

module.exports = router;
