const mongoose = require("mongoose");

const TraineInfo = mongoose.Schema({
  "date of Birth": Date,
  age: Number,
  email: String,
  educatation: String,
  programmingId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Programming" }],
  "TOEIC score": Number,
  "Experience Details": String,
  Department: String,
});

module.exports = mongoose.model("TraineeInfo", TraineInfo);
