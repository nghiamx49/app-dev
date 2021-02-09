const userRelatedCourses = require("express").Router({ mergeParams: true });
const db = require("../../Migrations/db.Connection");
const checkRole = require("../../Middleware/checkRole.Middleware");
const Course = db.courses;
const User = db.users;
const RelatedCourses = db.relatedCourses;
const Role = db.roles;
const Category = db.categories;

//get all courses that related to the user, allow all roles
userRelatedCourses.get("/", async (req, res, next) => {
  try {
    let allRelatedCourses = await RelatedCourses.find({
      userId: req.params.userId,
    });
    const relatedCourses = await Promise.all(
      allRelatedCourses.map(async (relatedCourse) => {
        const { _id, courseId, userId } = relatedCourse;
        const user = await User.findById(userId);
        const course = await Course.findById(courseId);
        const category = await Category.findById(course.categoryId);
        let obj = {
          _id,
          userId,
          courseId,
          username: user.username || "",
          courseName: course.name || "",
          categoryName: category.name || "",
        };
        return obj;
      })
    );
    res.status(200).json({
      message: { relatedCourses: relatedCourses || [] },
      mesError: false,
    });
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
      res.status(200).json({
        message: {
          courses: allCourses,
        },
        mesError: false,
      });
    } catch (error) {
      res.status(500).json({ message: { mesBody: "Errors" }, mesError: true });
      next(error);
    }
  }
);

userRelatedCourses.get("/currentinfo", async (req, res, next) => {
  try {
    let courses = await Course.find({});
    let relatedCourses = await RelatedCourses.find({
      userId: req.params.userId,
    });
    res.status(200).json({
      message: {
        courses: courses.length,
        relatedCourses: relatedCourses.length,
      },
      mesError: false,
    });
  } catch (error) {
    next(error);
  }
});

//assgin courses to trainers
userRelatedCourses.post(
  "/assign",
  checkRole.isStaff,
  async (req, res, next) => {
    try {
      const { courseName } = req.body;
      let courseId = await Course.findOne({ name: courseName });
      let userId = await User.findById(req.params.userId);
      let checkUserRole = await Role.findById(userId.roleId);
      if (checkUserRole.name === "admin" || checkUserRole.name === "staff") {
        res.status(400).json({
          message: { mesBody: "Cannot assign course to admin/staff account" },
          mesError: true,
        });
      }
      let relatedCourse = await new RelatedCourses({
        courseId,
        userId,
      });
      await relatedCourse.save();
      res.status(200).json({
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
      const { _id, courseId } = relatedCourse;
      let course = await Course.findById(courseId[0]);
      let category = await Category.findById(course.categoryId[0]);
      req.relatedCourse = {
        _id,
        courseName: course.name || "",
        courseDescription: course.description || "",
        categoryName: category.name || "",
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
    .json({ message: { relatedCourse: req.relatedCourse }, mesError: false });
});
//change assigned course to another course
userRelatedCourses.put(
  "/change/:relatedCourseId",
  checkRole.isStaff,
  async (req, res, next) => {
    try {
      const { _id } = req.relatedCourse;
      const { courseName } = req.body;
      let relatedCourse = await RelatedCourses.findById(_id);
      let findCourse = await Course.find({ name: courseName });
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
  }
);

userRelatedCourses.delete(
  "/remove/:relatedCourseId",
  checkRole.isStaff,
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
