import Book from "../models/Book";

module.exports.get = (req, res) => {
  let category = req.query.category;
  if (category.includes("-")) {
    category = category.replace("-", "&");
  }
  Book.find({ category })
    .limit(6)
    .select("coverImage title shortDescription price")
    .then(books => {
      books.splice(
        books.findIndex(book => {
          return book._id == req.params.id;
        }),
        1
      );
      res.json(books);
    })
    .catch(err => res.json(err));
};
