const Order = require("../models/Order");

module.exports.newOrder = (req, res) => {
  const { name, email, phoneNumber, totalPrice, address, books } = req.body;

  if (name && email && phoneNumber && totalPrice && address && books) {
    Order.create({
      name,
      email,
      phoneNumber,
      totalPrice,
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
  Order.find({}, (err, doc) => {
    if (err) {
      res.send(err);
    } else {
      res.json(doc);
    }
  });
};

module.exports.getSingleOrder = (req, res) => {
  Order.findById(req.params.id, (err, order) => {
    if (err) {
      res.send(err);
    } else {
      res.json(order);
    }
  });
};

module.exports.deleteSingleOrder = (req, res) => {
  Order.findByIdAndDelete(req.params.id, err => {
    if (err) {
      res.send(err);
    } else {
      res.send("Order has been Deleted Successfully");
    }
  });
};
