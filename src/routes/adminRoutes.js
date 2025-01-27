const express = require('express');
const { viewAllUsers, createProduct } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const roles = require('../models/Role');

const router = express.Router();

router.get('/users', authMiddleware, roleMiddleware([roles.ADMIN]), viewAllUsers);
router.post('/product', authMiddleware, roleMiddleware([roles.ADMIN]), createProduct);

module.exports = router;
