const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  gender: {type : String},
  name: {
        title: {type : String},
        first: {type : String},
        last: {type : String}
      },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required:true
  },
  address: {
    street: String,
    city: String,
    state: String,
    postcode: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;