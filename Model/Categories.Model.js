const mongoose = require("mongoose");

const Categories = mongoose.Schema({
  name: String,
  description: String,
});

module.exports = mongoose.model("Categories", Categories);
