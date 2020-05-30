const User = require("../models/user.model");

module.exports.requireAuth = async function(req, res, next) {
  if (!req.session.userId) {
    req.session.oldUrl = req.originalUrl
    res.redirect('/auth/login');
    return;
  }
  next();
};

module.exports.isLoggedIn = async function(req, res, next) {
  if (!req.session.userId) {
    res.redirect('/books');
    return;
  }
  next();
};

module.exports.isAdmin = function(req, res, next) {
  if (!res.locals.user.isAdmin) {
    res.render('noPermission')
    return;
  }
  next();
};

module.exports.redirectHome = function(req, res, next) {
  if (req.session.userId) {
    res.redirect('/books');
    return;
  }
  next();
};
