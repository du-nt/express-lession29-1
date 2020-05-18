const Transaction = require("../../models/transaction.model");
const User = require("../../models/user.model");
const Book = require("../../models/book.model");

module.exports.index = (req, res) => {
  //   var page = parseInt(req.query.page) || 1;
  //   var perPage = 5;

  //   var start = (page - 1) * perPage;
  //   var end = page * perPage;

  if (!res.locals.isAdmin) {
    Transaction.find({ userId: res.locals.user.id }).then(transactions =>
      res.render("transactions", { transactions })
    );
  } else {
    Transaction.find().then(transactions =>
      res.render("transactions", { transactions })
    );
  }
};

module.exports.createPost = (req, res) => {
  const newTransaction = new Transaction(req.body);
  newTransaction.save().then(newTransaction => res.redirect("/transactions"));
};

module.exports.createGet = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: { $ne: true } });
    const books = await Book.find();
    res.render("createTransaction", {
      users,
      books
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.complete = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    transaction.isComplete = true;
    await transaction.save();
    res.redirect("/transactions");
  } catch (err) {
    console.log(err);
  }
};
