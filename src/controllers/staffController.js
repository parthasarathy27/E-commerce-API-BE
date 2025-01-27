const Product = require('../models/Product');

// View products assigned to staff's vendors
const viewAssignedProducts = async (req, res) => {
    try {
        const products = await Product.find({ vendor: req.user.vendorId });
        res.status(200).json({ message: 'Assigned products retrieved successfully', products });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assigned products', error: error.message });
    }
};

// Add a product for assigned vendor
const addProductForVendor = async (req, res) => {
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
            vendor: req.user.vendorId,
            url: `${name.toLowerCase().replace(/ /g, '-')}-${Date.now()}`,
        });

        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
};

module.exports = { viewAssignedProducts, addProductForVendor };
