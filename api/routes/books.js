const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books");

router
  .route("/")
  .post(booksController.newBook)
  .get(booksController.getBooks);

router
  .route("/:id")
  .get(booksController.getSingleBook)
  .delete(booksController.deleteSingleBook)
  .patch(booksController.updateSingleBook);

module.exports = router;
