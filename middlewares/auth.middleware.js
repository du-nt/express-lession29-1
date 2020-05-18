const User = require("../models/user.model");

module.exports.requireAuth = async function(req, res, next) {
  if (!req.signedCookies.userId) {
    res.redirect("/auth/login");
    return;
  }
  const user = await User.findById(req.signedCookies.userId);
  if (!user) {
    res.redirect("/auth/login");
    return;
  }
  res.locals.user = user;
  res.locals.isAdmin = user.isAdmin;
  next();
};

module.exports.isAdmin = function(req, res, next) {
  if (!res.locals.isAdmin) {
    res.render('noPermission');
    return;
  }
  next();
};
