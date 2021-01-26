const express = require("express");
const courseRoute = express.Router();
const db = require("../../Migrations/db.Connection");
const passport = require("passport");
const passportConf = require("../../Middleware/Auth.Middleware");
const Course = db.courses;
const Category = db.categories;
//refer to stafCRUD

courseRoute.use(passport.authenticate("jwt", { session: false }));

courseRoute.get("/", async (req, res, next) => {
  try {
    let allCourses = await Course.find({});
    //using promise all to resolve all promise that the array.prototype.map function retrun
    const courses = await Promise.all(
      allCourses.map(async (course) => {
        let courseCate = await Category.findById(course.categoryId[0]);
        if (!courseCate) {
          next();
        }
        const { _id, name, description, categoryId } = course;
        course = {
          _id,
          name,
          description,
          categoryId,
          category: courseCate.name,
        };
        return course;
      })
    );
    res.status(200).json({ message: { courses: courses }, mesError: false });
  } catch (error) {
    res
      .status(404)
      .json({ message: { mesBody: "No course found" }, mesError: true });
    next(error);
  }
});



//refer to trainerCRUD
courseRoute.param("courseId", async (req, res, next, courseId) => {
  try {
    let findCourse = await Course.findById(courseId);
    const { _id, name, description, categoryId } = findCourse;
    let courseCate = await Category.findById(categoryId[0]);
    req.course = {
      _id,
      name,
      description,
      categoryId,
      category: courseCate.name || "",
    };
    next();
  } catch (error) {
    res
      .status(404)
      .json({ message: { mesBody: "No course found" }, mesError: true });
  }
});

courseRoute.get("/detail/:courseId", (req, res, next) => {
  res.status(200).json({ message: { course: req.course }, mesError: false });
});

module.exports = courseRoute;
