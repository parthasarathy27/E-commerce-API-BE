const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: { type: String, required: true },
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.'],
        },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ['buyer', 'admin', 'vendor', 'staff'],
            required: true,
        },
        vendorId: { 
            type: mongoose.Types.ObjectId, 
            ref: 'User', 
            required: function () { return this.role === 'staff'; }, 
        }, // For staff linked to vendor
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
