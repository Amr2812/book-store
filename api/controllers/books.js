const Book = require("../models/Book");

module.exports.newBook = (req, res, next) => {
  const {
    title,
    author,
    description,
    shortDescription,
    pagesCount,
    price,
    category,
    coverImage
  } = req.body;

  

  const newBook = new Book({
    title,
    author,
    description,
    shortDescription,
    pagesCount,
    price,
    category,
    coverImage
  });
};

module.exports.getBooks = (req, res, next) => {};

module.exports.getSingleBook = (req, res, next) => {};

module.exports.deleteSingleBook = (req, res, next) => {};

module.exports.updateSingleBook = (req, res, next) => {};
