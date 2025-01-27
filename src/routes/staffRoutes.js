const express = require('express');
const { viewAssignedProducts, addProductForVendor } = require('../controllers/staffController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const roles = require('../models/Role');

const router = express.Router();

router.get('/products', authMiddleware, roleMiddleware([roles.STAFF]), viewAssignedProducts);
router.post('/product', authMiddleware, roleMiddleware([roles.STAFF]), addProductForVendor);

module.exports = router;
