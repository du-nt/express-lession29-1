const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  sessionId: String,
  cart: {
        type: Array,
        default: []
    }
});
module.exports = mongoose.model("Session", sessionSchema);
