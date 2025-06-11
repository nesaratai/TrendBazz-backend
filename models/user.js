const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
    min: 0,
  },
  dob: {
    type: Date,
  },
  email: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Customer'],
    default: 'Customer'
  }
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;