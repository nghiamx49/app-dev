const userRelatedCourses = require("express").Router({ mergeParams: true });
const db = require("../../../Migrations/db.Connection");
const checkRole = require("../../../Middleware/checkRole.Middleware");
const Course = db.courses;
const User = db.users;
const RelatedCourses = db.relatedCourses;

userRelatedCourses.get("/", async (req, res, next) => {
  try {
    let allRelatedCourses = await RelatedCourses.find({
      userId: req.userInfo._id,
    });
    let relatedCourses = await Promise.all(
      allRelatedCourses.map((relatedCourse) => {
          const {_id, userId, courseId} = relatedCourse;
          let course = await Course.findById(courseId);
          let obj = {
              _id,
              userId,
              courseId,
              courseName: course.name || "",
          }
          return obj;
      })
    );
    res.status(200).json({message:{relatedCourses: relatedCourses}, mesError: false})
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Errors" }, mesError: true });
  }
});

module.exports = userRelatedCourses;
