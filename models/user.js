const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
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
  password: {
    type: String,
  }
});
// Create Model
const User = mongoose.model('User', userSchema);
// Export Model
module.exports = User;