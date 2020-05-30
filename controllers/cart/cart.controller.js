const Book = require("../../models/book.model");
const Transaction = require("../../models/transaction.model");
const Cart = require("../../models/cart.model");

module.exports.index = function(req, res) {
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  const items = cart.getItems();
  if (items.length) {
    res.render("cart", { items });
  } else {
    res.render("cart", { items: null });
  }
};

module.exports.reduce = function(req, res) {
  const bookId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduceOne(bookId);
  req.session.cart = cart;
  res.redirect("/cart");
};

module.exports.increase = function(req, res) {
  const bookId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.increaseOne(bookId);
  req.session.cart = cart;
  res.redirect("/cart");
};

module.exports.remove = function(req, res) {
  const bookId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.removeItem(bookId);
  req.session.cart = cart;
  res.redirect("/cart");
};

module.exports.addToCart = async function(req, res) {
  const bookId = req.params.bookId;
  if (!req.session) {
    res.redirect("/books");
    return;
  }
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  const book = await Book.findById(bookId);
  cart.add(book, bookId);
  req.session.cart = cart;
  res.redirect("/books");
};

module.exports.hire = async function(req, res) {
  if(!req.session.cart){
    return res.redirect('/cart')
  }
  const cart = new Cart(req.session.cart);
  const items = cart.getItems();
  if (!items.length) {
    return res.redirect('/cart')
  }
    res.render("hire", { items });
  }

module.exports.hireNow = async function(req, res) {
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  const items = cart.getItems();
  for (let item of items) {
    for (let i = 1; i <= item.qty; i++) {
      let transaction = {};
      transaction.name = `${res.locals.user.name}_${item.item.title}_${i}`;
      transaction.userId = req.session.userId;
      transaction.bookId = item.item._id;
      const newTransaction = new Transaction(transaction);
      await newTransaction.save();
    }
  }
  req.session.cart = null
  res.redirect('/books')
  }