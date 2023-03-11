const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;