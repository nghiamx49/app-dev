const userRelatedCourses = require("express").Router({ mergeParams: true });
const db = require("../../../Migrations/db.Connection");
const checkRole = require("../../../Middleware/checkRole.Middleware");
const Course = db.courses;
const User = db.users;
const RelatedCourses = db.relatedCourses;

//get all courses that related to the user, allow all roles
userRelatedCourses.get("/", async (req, res, next) => {
  try {
    let allRelatedCourses = await RelatedCourses.find({
      userId: req.userInfo._id,
    });
    const relatedCourses = await Promise.all(
      allRelatedCourses.map(async (relatedCourse) => {
        const { _id, courseId, userId } = relatedCourse;
        const user = await User.findById(userId[0]);
        const course = await Course.findById(courseId[0]);
        let obj = {
          _id,
          userId,
          courseId,
          username: user.username || "",
          course: course.name || "",
        };
        return obj;
      })
    );
    res
      .status(200)
      .json({ message: { relatedCourses: relatedCourses }, mesError: false });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Errors" }, mesError: true });
    next(error);
  }
});
//return data for select options
userRelatedCourses.get(
  "/dataoptional",
  checkRole.isStaff,
  async (req, res, next) => {
    try {
      let allCourses = await Course.find({});
      let allUser = await Course.find({});
      res.status(200).json({
        message: {
          mesBody: { courses: allCourses, users: allUser },
        },
        mesError: true,
      });
    } catch (error) {
      res.status(500).json({ message: { mesBody: "Errors" }, mesError: true });
      next(error);
    }
  }
);
//assgin courses to trainers
userRelatedCourses.post(
  "/assign",
  checkRole.isStaff,
  async (req, res, next) => {
    try {
      const { username, courseName } = req.body;
      let courseId = await Course.find({ name: courseName });
      let userId = await User.findOne({ username: username });
      let relatedCourse = await new RelatedCourses({
        courseId,
        userId,
      });
      await relatedCourse.save();
      res.status(200).json9({
        message: { mesBody: "Assign course successfully" },
        mesError: false,
      });
    } catch (error) {
      res.status(500).json({ message: { mesBody: "Errors" }, mesError: true });
      next(error);
    }
  }
);

userRelatedCourses.param(
  "relatedCourseId",
  async (req, res, next, relatedCourseId) => {
    try {
      let relatedCourse = await RelatedCourses.findById(relatedCourseId);
      if (!relatedCourse) {
        res.status(404).json({
          message: { mesBody: "related course not found" },
          mesError: true,
        });
      }
      const { _id, userId, courseId } = relatedCourse;
      let course = await Course.findById(courseId);
      let user = await Course.findById(userId);
      req.relatedCourse = {
        _id,
        userId,
        username: user.name || "",
        courseId,
        course: course.name || "",
      };
      next();
    } catch (error) {
      res.status(500).json({ message: { mesBody: "Errors" }, mesError: true });
      next(error);
    }
  }
);

userRelatedCourses.get("/detail/:relatedCourseId", (req, res, next) => {
  res
    .status(200)
    .json({ message: { mesBody: req.relatedCourse }, mesError: false });
});
//change assigned course to another course
userRelatedCourses.put("/change/:relatedCourseId", async (req, res, next) => {
  try {
    const { _id } = req.relatedCourse;
    const { course } = req.body;
    let relatedCourse = await Course.findById(_id);
    let findCourse = await Course.find({ name: course });
    relatedCourse.courseId = findCourse;
    await relatedCourse.save();
    res.status(200).json({
      message: { mesBody: "Change assigned course to user successfully" },
      mesError: false,
    });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Errors" }, mesError: true });
    next(error);
  }
});

userRelatedCourses.delete(
  "/remove/:relatedCourseId",
  async (req, res, next) => {
    const { _id } = req.relatedCourse;
    try {
      await RelatedCourses.deleteOne({ _id });
      res.status(200).json({
        message: { mesBody: "Remove assigned course from user successfully" },
        mesError: false,
      });
    } catch (error) {
      res.status(500).json({ message: { mesBody: "Errors" }, mesError: true });
      next(error);
    }
  }
);

module.exports = userRelatedCourses;
