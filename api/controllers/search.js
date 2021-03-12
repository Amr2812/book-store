import Book from "../models/Book";

module.exports.searchBooks = async (req, res) => {
  try {
    const books = await Book.aggregate([
      {
        $search: {
          text: {
            query: req.query.q,
            path: "title"
          }
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          shortDescription: 1,
          price: 1,
          coverImage: 1
        }
      }
    ]);
    res.json(books);
  } catch (err) {
    res.status(500).send(err);
  }
};
