const mongoose = require("mongoose");

const Request = mongoose.Schema({
  username: String,
  courseName: String,
  apply: Number,
});

module.exports = mongoose.model("Request", Request);
