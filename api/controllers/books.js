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

  if (
    title &&
    author &&
    description &&
    shortDescription &&
    pagesCount &&
    price &&
    category
  ) {
    Book.create({
      title,
      author,
      description,
      shortDescription,
      pagesCount,
      price,
      category,
      coverImage,
    })
      .then(() => res.send("Book Created"))
      .catch(err => res.send(err));
  } else {
    res.status(500).send("You have to fill out all fields!");
  }
};

module.exports.getBooks = (req, res, next) => {
  Book.find({})
    .then(books => res.json(books.reverse()))
    .catch(err => res.send(err));
};

module.exports.getSingleBook = (req, res, next) => {
  Book.findById(req.params.id)
    .then(books => res.json(books))
    .catch(err => res.send(err));
};

module.exports.deleteSingleBook = (req, res, next) => {
  const id = req.params.id;
  Book.findByIdAndDelete(id, err => {
    if (err) {
      res.send(err);
    } else {
      res.send("Book has been Deleted Successfully");
    }
  });
};

module.exports.updateSingleBook = (req, res, next) => {
  const id = req.params.id;
  const book = req.body;

  Book.findByIdAndUpdate(id, book, (err, doc) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.json(doc);
    }
  });
};
