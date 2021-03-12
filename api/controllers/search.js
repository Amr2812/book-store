import Book from "../models/Book";

module.exports.searchBooks = async (req, res) => {
  try {
    const result = await Book.aggregate([
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
          coverImage: 1,
          shortDescription: 1
        }
      }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
};
