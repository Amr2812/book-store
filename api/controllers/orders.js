const Order = require("../models/Order");

module.exports.newOrder = (req, res) => {
  const { name, email, phoneNumber, address, books } = req.body;

  if (name && email && phoneNumber && address && books) {
    Order.create({
      name,
      email,
      phoneNumber,
      address,
      books
    })
      .then(() => res.send("Order Created"))
      .catch(err => res.send(err));
  } else {
    res.status(500).send("You have to fill out all fields!");
  }
};

module.exports.getOrders = (req, res) => {
  Order.find({})
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports.getSingleOrder = (req, res) => {};

module.exports.deleteSingleOrder = (req, res) => {};
