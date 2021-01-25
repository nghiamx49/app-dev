const mongoose = require("mongoose");

const TrainerType = mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("TrainerTypes", TrainerType);
