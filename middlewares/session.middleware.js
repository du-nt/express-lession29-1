const User = require("../models/user.model");

module.exports = async function(req, res, next) {
  const userId = req.session.userId;
  if (userId) {
    const user = await User.findById(userId, "-password");
    res.locals.user = user;
    res.locals.isAdmin = user.isAdmin;
  }
  if (req.session.cart) {
    res.locals.quantity = req.session.cart.totalQty;
  }
  next();
};
