import Book from "../models/Book";

module.exports.get = (req, res) => {
  Book.find({ category: req.query.category })
    .limit(3)
    .select("coverImage title shortDescription price")
    .then(books => {
      books.splice(
        books.findIndex(book => {
          return book._id === req.params.id;
        }),
        1
      );
      res.json(books);
    });
};
