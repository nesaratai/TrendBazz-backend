const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Add in constant for the number of rounds 
const saltRounds = 12;


router.post('/sign-up', async (req, res) => {
    try {
          // Check if the username is already taken
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
        return res.status(409).json({err:'Username already taken.'});
      }
          // Create a new user with hashed password
    const user = await User.create({
        username: req.body.username,
        hashedPassword: bcrypt.hashSync(req.body.password, saltRounds),
        role: 'Customer',
        lname: req.body.lname,
        fname: req.body.fname,
        dob: req.body.dob,
        email: req.body.email
      });
          // Construct the payload
    const payload = { 
      username: user.username, 
      _id: user._id, 
     };
    // Create the token, attaching the payload
    const token = jwt.sign({ payload }, process.env.JWT_SECRET);

      res.status(201).json({ token });

    } catch (err) {
        res.status(500).json({ err: err.message });

    }
  });



  router.post('/sign-in', async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(401).json({ err: 'Invalid credentials.' });
      }
  
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password, user.hashedPassword
      );
      if (!isPasswordCorrect) {
        return res.status(401).json({ err: 'Invalid credentials.' });
      }
  
      // Construct the payload
      const payload = { 
        username: user.username, 
        _id: user._id, 
        role: user.role,
        email: user.email,
        fname: user.fname,
        lname: user.lname
      };
  
      // Create the token, attaching the payload
      const token = jwt.sign({ payload }, process.env.JWT_SECRET);
  
      // Send the token instead of the message
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

module.exports = router;