const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        priceOld: { type: Number, required: true },
        priceNew: { 
            type: Number, 
            required: true,
            validate: {
                validator: function (value) {
                    return value < this.priceOld;
                },
                message: 'New price must be less than old price.',
            },
        },
        startDate: { type: Date, required: true },
        expiryDate: { type: Date, required: true },
        freeDelivery: { type: Boolean, default: false },
        deliveryAmount: { 
            type: Number,
            required: function () { return !this.freeDelivery; }, 
        },
        vendor: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        url: { type: String, unique: true, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
