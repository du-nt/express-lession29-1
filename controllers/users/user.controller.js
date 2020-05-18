const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const User = require("../../models/user.model");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const myPlaintextPassword = "123123";

module.exports.index = (req, res) => {
  //   var page = parseInt(req.query.page) || 1;
  //   var perPage = 5;

  //   var start = (page - 1) * perPage;
  //   var end = page * perPage;
  User.find({ isAdmin: { $ne: true } }).then(users =>
    res.render("users", { users })
  );
};

module.exports.addUserPost = (req, res) => {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
      const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: hash
      });
      newUser
        .save()
        .then(newUser => {
          res.redirect("/users");
        })
        .catch(err => console.log(err));
    });
  });
};

module.exports.deleteUser = (req, res) => {
  User.findById(req.params.id).then(user => {
    user.remove().then(user => {
      res.redirect("/users");
    });
  });
};

module.exports.editUserGet = (req, res) => {
  User.findById(req.params.id).then(user => res.render("editUser", { user }));
};

module.exports.editUserPost = (req, res) => {
  const id = req.params.id;
  if (req.file) {
    cloudinary.uploader.upload(req.file.path, { tags: "avatar" }, function(
      err,
      result
    ) {
      req.body.avatarUrl = result.url;
      User.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.redirect("/users"))
        .catch(err => console.log(err));
    });
  } else {
    User.findByIdAndUpdate(id, req.body, { new: true })
      .then(user => res.redirect("/users"))
      .catch(err => console.log(err));
  }
};
