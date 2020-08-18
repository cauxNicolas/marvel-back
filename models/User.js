const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  lastname: String,
  email: { type: String, unique: true },
  hash: String,
  token: String,
  salt: String,
});

module.exports = User;
