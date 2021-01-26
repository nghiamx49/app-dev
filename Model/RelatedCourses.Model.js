const mongoose = require("mongoose");

const RelatedCourses = mongoose.Schema({
  courseId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Courses" }],
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
});

module.exports = mongoose.model("RelatedCourses", RelatedCourses);
