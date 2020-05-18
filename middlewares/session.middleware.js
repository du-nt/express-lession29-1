const shortid = require("shortid");
const Session = require("../models/session.model");
const Book = require("../models/book.model");

module.exports = async function(req, res, next) {
  const sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    const sessionId = shortid.generate();
    res.cookie("sessionId", sessionId, {
      signed: true
    });
    const newSession = new Session({ sessionId });
    await newSession.save();
  } else {
    const isExisted = await Session.findOne({ sessionId });
    await Session.deleteMany({ sessionId: { $ne: sessionId } });
    if (!isExisted) {
      const newSession = new Session({ sessionId });
      await newSession.save();
    }
  }
  const isExisted = await Session.findOne({ sessionId });
  if (isExisted && isExisted.cart.length > 0) {
    res.locals.quantity = isExisted.cart.reduce((a, b) => a + b.quantity, 0);
    const items = isExisted.cart;
    let books = [];
    for (let item of items) {
      let book = await Book.findById(item.bookId);
      let quantity = item.quantity;
      let object = { book, quantity };
      books.push(object);
      res.locals.books = books;
    }
  }
  next();
};
