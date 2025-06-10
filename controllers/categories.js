const Category = require('../models/category');
const express = require('express');
const router = express.Router();

// Write your routes/controller functions here
//  creating the categories
router.post('/', async (req, res) => {
    // use try and catch
    try {
      // Create a new category with the data from req.body
        const createdCategory = await Category.create(req.body);
        // 201 created
        res.status(201).json(createdCategory);
    } catch (err) {
        // 500 Internal Server Error
        res.status(500).json({ err: err.message });
    }
  });


// listing all categories
router.get('/', async (req, res) => {
    try {
        // find the categories
      const foundCategories = await Category.find();
      // 200 successful
      res.status(200).json(foundCategories);
    } catch (err) {
        // 500 Internal Server Error
      res.status(500).json({ err: err.message }); 
    }
  });


// show one category
router.get('/:categoryId', async (req, res) => {
    try {
        // find the category by id
      const foundCategory = await Category.findById(req.params.categoryId);
      // if not found send 404
      if (!foundCategory) {
        res.status(404);
        throw new Error('Category not found.');
      }
      res.status(200).json(foundCategory);
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

// updating categories

router.put('/:categoryId', async (req, res) => {
    // Using try and catch
    try {
        // statement to handle the update of a category
      const updatedCategory = await Category.findByIdAndUpdate(req.params.categoryId, req.body, {
        new: true,
      });
      // if statement to handle if not found a category
      if (!updatedCategory) {
        // send 404
        res.status(404);
        throw new Error('Category not found.');
      }
      // 200 successfull
      res.status(200).json(updatedCategory);
    } catch (err) {
      // Add code for errors
      if (res.statusCode === 404) {
        res.json({ err: err.message });
      } else {
        res.status(500).json({ err: err.message });
      }
    }
  });


// deleting categories
router.delete('/:categoryId', async (req, res) => {
  
    try {
        // handle deleting a category
      const deletedCategory = await Category.findByIdAndDelete(req.params.categoryId);
        // if statement for handling the error of not finding a category
      if (!deletedCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }
        // response 200 successfull
      res.status(200).json(deletedCategory);
    } catch (error) {
        // if cant delete a category send a 500
      res.status(500).json({ error: 'An error occurred while deleting a Category' });
    }
  });

  // Export the router
module.exports = router;