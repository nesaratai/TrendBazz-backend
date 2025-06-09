const mongoose = require('mongoose');

// Create product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // Consider making it required
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
    },
    img: {
        type: String, // Use String for URLs
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }
});

// Create model
const Product = mongoose.model('Product', productSchema);

// Export model
module.exports = Product;