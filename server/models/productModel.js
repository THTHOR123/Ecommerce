const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String, // Changed from Object to String
        required: true
    },
    category: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default:false
    },
    sold: {
        type: Number,
        default: 0 // Fixed typo: required to default
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Products', productSchema);
