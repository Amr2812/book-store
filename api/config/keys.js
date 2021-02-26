require('dotenv').config();

// let MongoURI;

// if (process.env.NODE_ENV === "development") {
//   MongoURI = "mongodb://localhost:27017/book-store";
// } else {
//   MongoURI = process.env.MongoURI;
// }

module.exports.MongoURI = process.env.MongoURI;
