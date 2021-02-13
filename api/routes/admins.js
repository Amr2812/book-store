const express = require("express");
const router = express.Router();

const adminsController = require("../controllers/admins");

router.route("/login").post(adminsController.login);

module.exports = router;
