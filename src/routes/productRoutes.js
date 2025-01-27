const express = require('express');
const { listProducts, viewProduct } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/products', listProducts); // Public listing of products
router.get('/product/:id', authMiddleware, viewProduct); // Authenticated for detailed view

module.exports = router;
