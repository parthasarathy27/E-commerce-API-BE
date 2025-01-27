const Product = require('../models/Product');

// List all products with pagination
const listProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;

        const query = search ? { name: { $regex: search, $options: 'i' } } : {};
        const products = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .populate('vendor', 'username email');

        const total = await Product.countDocuments(query);

        res.status(200).json({
            message: 'Products retrieved successfully',
            total,
            page: Number(page),
            limit: Number(limit),
            products,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// View a specific product
const viewProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('vendor', 'username email');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const discountAmount = product.priceOld && product.priceNew 
            ? parseFloat(product.priceOld - product.priceNew).toFixed(2)
            : null;

        const discountPercentage = product.priceOld && product.priceNew 
            ? ((discountAmount / product.priceOld) * 100).toFixed(2)
            : null;

        res.status(200).json({
            message: 'Product retrieved successfully',
            product,
            discount: { amount: discountAmount, percentage: discountPercentage },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

module.exports = { listProducts, viewProduct };
