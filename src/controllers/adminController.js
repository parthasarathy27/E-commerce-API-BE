const User = require('../models/User');
const Product = require('../models/Product');

// View all users (buyers, vendors, staff)
const viewAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $in: ['buyer', 'vendor', 'staff'] } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, category, priceOld, priceNew, startDate, freeDelivery, deliveryAmount } = req.body;

        const product = new Product({
            name,
            description,
            category,
            priceOld,
            priceNew,
            startDate,
            expiryDate: new Date(new Date(startDate).getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days expiry
            freeDelivery,
            deliveryAmount,
            url: `${name.toLowerCase().replace(/ /g, '-')}-${Date.now()}`,
        });

        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

module.exports = { viewAllUsers, createProduct };
