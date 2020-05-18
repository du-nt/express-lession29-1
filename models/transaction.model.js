const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  name: String,
  userId: String,
  bookId: String,
  isComplete: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Transaction", transactionSchema);
