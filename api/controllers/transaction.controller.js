const Transaction = require("../../models/transaction.model");
const User = require("../../models/user.model");
const Book = require("../../models/book.model");

module.exports.index = async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
};

module.exports.createPost = (req, res) => {
  const newTransaction = new Transaction(req.body);
  newTransaction.save().then(newTransaction => res.json(newTransaction));
};

module.exports.createGet = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: { $ne: true } });
    const books = await Book.find();
    res.json({
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
    res.json(transaction);
  } catch (err) {
    console.log(err);
  }
};
