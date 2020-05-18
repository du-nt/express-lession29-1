const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  avatarUrl: {
    type: String,
    default: "https://i1.sndcdn.com/avatars-000409376361-pbso33-t500x500.jpg"
  },
  wrongLoginCount: {
    type: Number,
    default: 0
  },
  isAdmin:{
    type: Boolean,
    default: false
  }
});
module.exports = mongoose.model("User", userSchema);
