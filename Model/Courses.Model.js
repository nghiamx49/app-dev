const mongoose = require("mongoose");

const Courses = mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  categoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categories" }],
});

module.exports = mongoose.model("Courses", Courses);
