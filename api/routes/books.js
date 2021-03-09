const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/admin");
const booksController = require("../controllers/books");

router
  .route("/")
  .post(isAuthenticated, booksController.newBook)
  .get(booksController.getBooks);

router
  .route("/:id")
  .get(booksController.getSingleBook)
  .delete(isAuthenticated, booksController.deleteSingleBook)
  .patch(isAuthenticated, booksController.updateSingleBook);

module.exports = router;
