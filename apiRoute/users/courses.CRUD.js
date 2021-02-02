const express = require("express");
const courseCRUD = express.Router({ mergeParams: true });
const db = require("../../Migrations/db.Connection");
const passport = require("passport");
const passportConf = require("../../Middleware/Auth.Middleware");
const Course = db.courses;
const Category = db.categories;
const checkRole = require("../../Middleware/checkRole.Middleware");

//allow all roles can access to get all courses available in system
courseCRUD.get("/", async (req, res, next) => {
  try {
    let allCourses = await Course.find({});
    if (!allCourses) {
      res
        .status(404)
        .json({ message: { mesBody: "No courses found" }, mesError: true });
      next(error);
    }
    //using promise all to resolve all promise that the array.prototype.map function retrun
    const courses = await Promise.all(
      allCourses.map(async (course) => {
        const { _id, name, description, categoryId } = course;
        let courseCate = await Category.findById(categoryId[0]);
        course = {
          _id,
          courseName: name,
          categoryId,
          courseCategory: courseCate.name,
        };
        return course;
      })
    );
    res.status(200).json({ message: { courses: courses }, mesError: false });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});
//create new course
courseCRUD.post("/create", checkRole.isStaff, async (req, res, next) => {
  try {
    const { courseName, courseDescription, courseCategory } = req.body;
    let categoryId = await Category.find({ name: courseCategory });
    let course = await new Course({
      name: courseName,
      description: courseDescription,
      categoryId,
    });
    await course.save();
    res.status(200).json({
      message: { mesBody: "Create new course successfully" },
      mesError: false,
    });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});

//find course by courseId and return an object couse with category name
courseCRUD.param("courseId", async (req, res, next, courseId) => {
  try {
    let findCourse = await Course.findById(courseId);
    if (!findCourse) {
      res
        .status(404)
        .json({ message: { mesBody: "Course not found" }, mesError: true });
    }
    const { _id, name, description, categoryId } = findCourse;
    let courseCate = await Category.findById(categoryId[0]);
    req.course = {
      _id,
      courseName: name,
      courseDescription: description,
      categoryId,
      courseCategory: courseCate.name || "",
    };
    next();
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Errors" }, mesError: true });
    next(error);
  }
});

courseCRUD.get("/detail/:courseId", checkRole.isStaff, (req, res, next) => {
  res.status(200).json({ message: { course: req.course }, mesError: false });
});

courseCRUD.put("/edit/:courseId", checkRole.isStaff, async (req, res, next) => {
  try {
    const { courseName, courseDescription, courseCategory } = req.body;
    const { _id } = req.course;
    let categoryId = await Category.find({ name: courseCategory });
    let findCourse = await Course.findById(_id);
    findCourse.name = courseName;
    findCourse.description = courseDescription;
    findCourse.categoryId = categoryId;
    await findCourse.save();
    res.status(200).json({
      message: { mesBody: "Update course successfully" },
      mesError: false,
    });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});

courseCRUD.delete(
  "/delete/:courseId",
  checkRole.isStaff,
  async (req, res, next) => {
    try {
      const { _id } = req.course;
      await Course.deleteOne({ _id });
      res.status(200).json({
        message: { mesBody: "Delete course successfully" },
        mesError: false,
      });
    } catch (error) {
      res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
      next(error);
    }
  }
);

module.exports = courseCRUD;
