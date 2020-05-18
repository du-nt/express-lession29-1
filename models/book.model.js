const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  coverUrl: {
    type: String,
    default:
      "https://responsiblefinance.org.uk/wp-content/uploads/2015/08/aba-04.png"
  }
});

module.exports = mongoose.model("Book", bookSchema);
