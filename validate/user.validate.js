const User = require("../models/user.model");

module.exports.addValidate = async function(req, res, next) {
  const users = await User.find();
  let errors = [];
  if (req.body.name.length > 30) {
    errors.push("Username must have max 30 characters");
  }
  if (errors.length) {
    res.render("users", { users, errors });
    return;
  }
  next();
};
