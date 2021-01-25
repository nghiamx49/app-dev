const mongoose = require("mongoose");

const TrainerInfo = mongoose.Schema({
  "working Place": String,
  "phone Number": Number,
  email: String,
  typeId: [{ type: mongoose.Schema.Types.ObjectId, ref: "TrainerTypes" }],
});

module.exports = mongoose.model("TrainerInfo", TrainerInfo);
