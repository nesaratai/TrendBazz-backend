const Product = require('../models/product');
const express = require('express');
const router = express.Router();


//  Creating the Product
router.post('/', async (req, res) => {
    // use try and catch
    try {
      // Create a new Product with the data from req.body
        const createdProduct = await Product.create(req.body);
        // 201 created
        res.status(201).json(createdProduct);
    } catch (err) {
        // 500 Internal Server Error
        res.status(500).json({ err: err.message });
    }
  });


// List all Products
router.get('/', async (req, res) => {
    try {
        // Find the Products
      const foundProducts = await Product.find();
      // 200 successful
      res.status(200).json(foundProducts);
    } catch (err) {
        // 500 Internal Server Error
      res.status(500).json({ err: err.message }); 
    }
  });

// GET products by category
router.get('/category/:categoryName', async (req, res) => {
  // Extract category name from params
  const { categoryName } = req.params;
  try {
    // Find the products and populate the category reference
    const products = await Product.find().populate('category_id');
     // Filter products where the category name matches the requested nam
    const filtered = products.filter(
      (p) => p.category_id?.name?.toLowerCase() === categoryName.toLowerCase()
    );
    // Respond filtered list as a JSON
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});


// show one Product
router.get('/:productId', async (req, res) => {
    try {
        // find the Product by id
      const foundProduct = await Product.findById(req.params.productId);
      // if not found send 404
      if (!foundProduct) {
        res.status(404);
        throw new Error('Product not found.');
      }
      res.status(200).json(foundProduct);
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


// updating Products

router.put('/:productId', async (req, res) => {
    // Using try and catch
    try {
        // statement to handle the update of a Product
      const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true,
      });
      // if statement to handle if not found a Product
      if (!updatedProduct) {
        // send 404
        res.status(404);
        throw new Error('Product not found.');
      }
      // 200 successfull
      res.status(200).json(updatedProduct);
    } catch (err) {
      // Add code for errors
      if (res.statusCode === 404) {
        res.json({ err: err.message });
      } else {
        res.status(500).json({ err: err.message });
      }
    }
  });


// deleting Products
router.delete('/:productId', async (req, res) => {
  
    try {
        // handle deleting a Product
      const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
        // if statement for handling the error of not finding a Product
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
        // response 200 successfull
      res.status(200).json(deletedProduct);
    } catch (error) {
        // if cant delete a Product send a 500
      res.status(500).json({ error: 'An error occurred while deleting a Product' });
    }
  });

  // Export the router
module.exports = router;