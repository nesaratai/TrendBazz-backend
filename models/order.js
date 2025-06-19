const mongoose = require('mongoose');

// Create Order Schema
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
          },
          name: String,
          price: Number,
          quantity: {
            type: Number,
            required: true,
            min: 1
          }
        }
      ],
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered'],
        default: 'Pending'
    },
    totalPrice: {
        type: Number,
        required: true
    },
    shippingDetails: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true }
      }
});

// Create Model
const Order = mongoose.model('Order', orderSchema);

// Export Model
module.exports = Order;