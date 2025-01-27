const Product = require('../models/Product');

// View vendor's products
const viewOwnProducts = async (req, res) => {
    try {
        const products = await Product.find({ vendor: req.user._id });
        res.status(200).json({ message: 'Vendor products retrieved successfully', products });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vendor products', error: error.message });
    }
};

// Add a product
const addProduct = async (req, res) => {
    try {
        const { name, description, category, priceOld, priceNew, startDate, freeDelivery, deliveryAmount } = req.body;

        const product = new Product({
            name,
            description,
            category,
            priceOld,
            priceNew,
            startDate,
            expiryDate: new Date(new Date(startDate).getTime() + 7 * 24 * 60 * 60 * 1000),
            freeDelivery,
            deliveryAmount,
            vendor: req.user._id,
            url: `${name.toLowerCase().replace(/ /g, '-')}-${Date.now()}`,
        });

        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
};

module.exports = { viewOwnProducts, addProduct };
