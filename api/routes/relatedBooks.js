const express = require("express");
const router = express.Router();

const relatedBooksController = require("../controllers/relatedBooks");

router.route("/:id").get(relatedBooksController.get);

module.exports = router;
