const Order = require('../models/order');
const express = require('express');
const router = express.Router();


//  creating the Order
router.post('/', async (req, res) => {
    // use try and catch
    try {
      const { userId, items, totalPrice, shippingDetails } = req.body;

      // Basic validation
      if (!userId || !items || !totalPrice || !shippingDetails) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      // Create a new order with the data from req.body
      const createdOrder = await Order.create({
        userId,
        items,
        totalPrice,
        shippingDetails,
      });
        // 201 created
        res.status(201).json(createdOrder);
    } catch (err) {
        // 500 Internal Server Error
        res.status(500).json({ err: err.message });
    }
  });


// listing all order
router.get('/', async (req, res) => {
    try {
        // find the Orders
        const foundOrders = await Order.find()
        .populate('userId', 'username email')
        .populate('items.productId', 'name price');
      // 200 successful
      res.status(200).json(foundOrders);
    } catch (err) {
        // 500 Internal Server Error
      res.status(500).json({ err: err.message }); 
    }
  });

// GET all orders by userId
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate('items.productId', 'name price')
      // recent orders first
      .sort({ orderDate: -1 }); 

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// show one order
router.get('/:orderId', async (req, res) => {
    try {
        // find the order by id
        const foundOrder = await Order.findById(req.params.orderId)
        .populate('items.productId', 'name price')
        .populate('userId', 'username email');
      // if not found send 404
      if (!foundOrder) {
        res.status(404);
        throw new Error('order not found.');
      }
      res.status(200).json(foundOrder);
    } catch (err) {
        // if statement for handling the error 404 and all other errors
      if (res.statusCode === 404) {
        res.json({ err: err.message });
      } else {
        // Add else statement to handle all other errors
        res.status(500).json({ err: err.message });
      }
    }
  });


// updating Orders

router.put('/:orderId', async (req, res) => {
    // Using try and catch
    try {
        // statement to handle the update of a order
      const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, req.body, {
        new: true,
      });
      // if statement to handle if not found a order
      if (!updatedOrder) {
        // send 404
        res.status(404);
        throw new Error('order not found.');
      }
      // 200 successfull
      res.status(200).json(updatedOrder);
    } catch (err) {
      // Add code for errors
      if (res.statusCode === 404) {
        res.json({ err: err.message });
      } else {
        res.status(500).json({ err: err.message });
      }
    }
  });


// deleting Orders
router.delete('/:orderId', async (req, res) => {
  
    try {
        // handle deleting a order
      const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
        // if statement for handling the error of not finding a order
      if (!deletedOrder) {
        return res.status(404).json({ error: 'order not found' });
      }
        // response 200 successfull
      res.status(200).json(deletedOrder);
    } catch (error) {
        // if cant delete a order send a 500
      res.status(500).json({ error: 'An error occurred while deleting a order' });
    }
  });

  // Export the router
module.exports = router;