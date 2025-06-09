const mongoose = require('mongoose');

// Create Category Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    }
});

// Create Model
const Category = mongoose.model('Category', categorySchema);

// Export Model
module.exports = Category;