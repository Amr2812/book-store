const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

require("./config/passport")(passport);

// DB Config
const { MongoURI } = require("./config/keys");
mongoose
  .connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => console.log(err));

// Create express instance
const app = express();

// Require API routes
const adminsRouter = require("./routes/admins");

// Import API Routes
app.use("/admins", adminsRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// express-session
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV ? "production" : "development",
      httpOnly: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Export express app
module.exports = app;

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
}
