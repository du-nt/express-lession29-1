const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const User = require("../../models/user.model");

var userValidate = require("../../validate/user.validate2");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const myPlaintextPassword = "123123";

module.exports.getUsers = (req, res) => {
  User.find({ isAdmin: { $ne: true } }).then(users => res.json(users));
};

module.exports.addUser = (req, res) => {
  const { isValid, errors } = userValidate(req.body.name);

  if (!isValid) {
    return res.status(404).json(errors);
  }

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
          res.json(newUser);
        })
        .catch(err => console.log(err));
    });
  });
};

module.exports.deleteUser = (req, res) => {
  User.findById(req.params.id).then(user => {
    user.remove().then(user => {
      res.json(user);
    });
  });
};

module.exports.editUser = (req, res) => {
  const id = req.params.id;
  if (req.file) {
    cloudinary.uploader.upload(req.file.path, { tags: "avatar" }, function(
      err,
      result
    ) {
      req.body.avatarUrl = result.url;
      User.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => console.log(err));
    });
  } else {
    User.findByIdAndUpdate(id, req.body, { new: true })
      .then(user => res.json(user))
      .catch(err => console.log(err));
  }
};
