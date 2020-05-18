const Book = require("../../models/book.model");
const Transaction = require("../../models/transaction.model");
const Session = require("../../models/session.model");

module.exports.index = function(req, res) {
  res.render("cart");
};

module.exports.addToCart = async function(req, res) {
  const bookId = req.params.bookId;
  const sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect("/books");
    return;
  }
  const session = await Session.find({ sessionId });
  if (session[0].cart.length === 0) {
    await Session.findOneAndUpdate(
      { sessionId },
      {
        $push: {
          cart: {
            bookId,
            quantity: 1
          }
        }
      },
      { new: true }
    );
  } else {
    const isExisting = session[0].cart.findIndex(
      item => item.bookId === bookId
    );
    if (isExisting === -1) {
      await Session.findOneAndUpdate(
        { sessionId },
        {
          $push: {
            cart: {
              bookId,
              quantity: 1
            }
          }
        },
        { new: true }
      );
    } else {
      await Session.findOneAndUpdate(
        { sessionId, "cart.bookId": bookId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true }
      );
    }
  }
  res.redirect("/books");
};

module.exports.hire = async function(req, res) {
  const books = res.locals.books;
  for (let book of books) {
    for (let i = 1; i <= book.quantity; i++) {
      let transaction = {};
      transaction.name = `${res.locals.user.name}_${book.book.title}_${i}`;
      transaction.userId = res.locals.user.id;
      transaction.bookId = book.book.id;
      const newTransaction = new Transaction(transaction);
      await newTransaction.save();
    }
  }
  const sessionId = req.signedCookies.sessionId;
  await Session.findOneAndUpdate({ sessionId }, { cart: [] });
  res.redirect("/transactions");
};
