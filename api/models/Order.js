const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  }
});

const orderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  books: [bookSchema]
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
