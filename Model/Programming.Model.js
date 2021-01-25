const mongoose = require("mongoose");

const Programming = mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Programmings", Programming);
