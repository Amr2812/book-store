const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/admin");
const adminsController = require("../controllers/admins");

router.route("/new").post(isAuthenticated, adminsController.newAdmin);

router
  .route("/")
  .get(isAuthenticated, adminsController.getAdmins)
  .delete(adminsController.logout);

router.route("/:id").delete(isAuthenticated, adminsController.deleteAdmin);

router.route("/login").post(adminsController.login);

module.exports = router;
