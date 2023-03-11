const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true
  },
  payment_method: {
    type: String,
    required: true
  },
  card_details: {
    card_number: {
      type: String,
      required: true
    },
    expiry_date: {
      type: String,
      required: true
    },
    cvv: {
      type: String,
      required: true
    }
  },
  shipping_address: {
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

const CheckoutModel = mongoose.model('Checkout', checkoutSchema);

module.exports = CheckoutModel;