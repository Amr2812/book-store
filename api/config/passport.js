const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      Admin.findOne({ email })
        .then(admin => {
          if (!admin) {
            return done(null, false, {
              message: "This email is not registered"
            });
          }
          bcrypt.compare(password, admin.password, (err, isAuthenticated) => {
            if (err) throw err;
            if (isAuthenticated) {
              return done(null, admin);
            } else {
              return done(null, false, { message: "Password Incorrect" });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((admin, done) => {
    done(null, admin.id);
  });

  passport.deserializeUser((id, done) => {
    Admin.findById(id, (err, admin) => {
      done(err, admin);
    });
  });
};
