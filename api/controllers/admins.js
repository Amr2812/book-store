const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const passport = require("passport");

module.exports.login = (req, res, next) => {
  passport.authenticate("local", (err, admin, info) => {
    if (err) {
      return next(err);
    }
    if (!admin) {
      return res.status(404).send({ error: "Incorrect email or password" });
    }
    req.logIn(admin, err => {
      if (err) {
        return next(err);
      }
      return res.send(admin);
    });
  })(req, res, next);
};
