const express = require('express');
const { viewOwnProducts, addProduct } = require('../controllers/vendorController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const roles = require('../models/Role');

const router = express.Router();

router.get('/products', authMiddleware, roleMiddleware([roles.VENDOR]), viewOwnProducts);
router.post('/product', authMiddleware, roleMiddleware([roles.VENDOR]), addProduct);

module.exports = router;
