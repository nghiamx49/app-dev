const mongoose = require("mongoose");

const TrainerInfo = mongoose.Schema({
  workingPlace: String,
  phoneNumber: Number,
  email: String,
  typeId: [{ type: mongoose.Schema.Types.ObjectId, ref: "TrainerTypes" }],
});

module.exports = mongoose.model("TrainerInfo", TrainerInfo);
