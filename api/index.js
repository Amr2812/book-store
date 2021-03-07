const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

require("dotenv").config();

require("./config/passport")(passport);

// Create express instance
const app = express();

// DB Config
const { MongoURI } = require("./config/keys");
mongoose
  .connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Connected to", MongoURI))
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// express-session
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV ? "production" : "development",
      httpOnly: true
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Require API routes
const adminsRouter = require("./routes/admins");
const booksRouter = require("./routes/books");
const searchRouter = require("./routes/search");
const ordersRouter = require("./routes/orders");

// Import API Routes
app.use("/admins", adminsRouter);
app.use("/books", booksRouter);
app.use("/search", searchRouter);
app.use("/orders", ordersRouter);

// Export express app
module.exports = app;

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
}
