const express = require("express");
const router = express.Router();

const searchController = require("../controllers/search");

router.route("/").get(searchController.searchBooks);

module.exports = router;
