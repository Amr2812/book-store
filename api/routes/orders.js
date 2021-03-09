const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/admin");
const ordersController = require("../controllers/orders");

router
  .route("/")
  .post(ordersController.newOrder)
  .get(isAuthenticated, ordersController.getOrders);

router
  .route("/:id")
  .get(isAuthenticated, ordersController.getSingleOrder)
  .delete(isAuthenticated, ordersController.deleteSingleOrder);

module.exports = router;
