const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const passport = require("passport");

module.exports.getAdmins = (req, res) => {
  Admin.find({}, (err, admins) => {
    if (err) {
      res.send(err);
    } else {
      res.json(admins);
    }
  });
};

module.exports.newAdmin = (req, res) => {
  const { name, email, password } = req.body;
  let errors = [];

  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    Admin.findOne({ email }).then(admin => {
      if (admin) {
        errors.push({ msg: "This email is already registered!" });
        res.json({ errors });
      } else {
        const newAdmin = new Admin({
          name,
          email,
          password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin
              .save()
              .then(admin => {
                res.send("Admin Created Successfully!");
              })
              .catch(err => res.send(err));
          });
        });
      }
    });
  }
};

module.exports.deleteAdmin = (req, res) => {
  Admin.findByIdAndDelete(req.params.id, err => {
    if (err) {
      res.send(err);
    } else {
      res.send("Admin has been Deleted Successfully");
    }
  });
};

module.exports.login = (req, res, next) => {
  passport.authenticate("local", (err, admin, info) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!admin) {
      return res.status(404).send("Incorrect email or password");
    }
    req.login(admin, err => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send("Logged In");
    });
  })(req, res, next);
};

module.exports.logout = (req, res) => {
  req.logout();
  res.send("Logged Out");
};
