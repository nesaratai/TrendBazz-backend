const mongoose = require('mongoose');

// Create product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
        default: 0,
        min: 0,
    },
    img: {
        type: String,
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