const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  coverUrl: {
    type: String,
    default:
      "https://responsiblefinance.org.uk/wp-content/uploads/2015/08/aba-04.png"
  }
});
bookSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Book", bookSchema);
