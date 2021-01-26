const mongoose = require("mongoose");

const Categories = mongoose.Schema({
  id: Number,
  name: String,
  description: String,
});

module.exports = mongoose.model("Categories", Categories);
