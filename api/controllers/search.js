import Book from "../models/Book";

module.exports.searchBooks = async (req, res) => {
  try {
    const books = await Book.find(
      { $text: { $search: req.query.q } },
    );
    res.json(books);
  } catch (err) {
    res.status(500).send(err);
  }
};
