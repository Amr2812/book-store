const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/orders");

router
  .route("/")
  .post(ordersController.newOrder)
  .get(ordersController.getOrders);

router
  .route("/:id")
  .get(ordersController.getSingleOrder)
  .delete(ordersController.deleteSingleOrder);

module.exports = router;
