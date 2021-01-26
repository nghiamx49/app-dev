const mongoose = require("mongoose");

const TraineInfo = mongoose.Schema({
  dateOfBirth: Date,
  age: Number,
  email: String,
  educatation: String,
  programmingId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Programming" }],
  TOEICScore: Number,
  experienceDetails: String,
  department: String,
});

module.exports = mongoose.model("TraineeInfo", TraineInfo);
