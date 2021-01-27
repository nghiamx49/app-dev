const express = require("express");
const userRoute = express.Router();
const db = require("../../Migrations/db.Connection");
const passport = require("passport");
const passportConf = require("../../Middleware/Auth.Middleware");
const checkRole = require("../../Middleware/checkRole.Middleware");
const Course = db.courses;
const Category = db.categories;
const extendRoute = require("./extend.Api");

//after logged into application, use will had access right to this route based on their role
userRoute.use(passport.authenticate("jwt", { session: false }));

//allow all roles can access to get all courses available in system
userRoute.get("/courses", async (req, res, next) => {
  try {
    let allCourses = await Course.find({});
    //using promise all to resolve all promise that the array.prototype.map function retrun
    const courses = await Promise.all(
      allCourses.map(async (course) => {
        let courseCate = await Category.findById(course.categoryId[0]);
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
      .json({ message: { mesBody: "No courses found" }, mesError: true });
    next(error);
  }
});

//find course by courseId and return an object couse with category name
userRoute.param("courseId", async (req, res, next, courseId) => {
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
  next(error);
});

//find user by id and return an object contains information of this user
trainerCRUD.param("userId", async (req, res, next, trainerId) => {
  try {
    let user = await User.findById(trainerId);
    const { _id, username, password, name, roleId } = user;
    let userRole = await User.findById(roleId[0]);
    let additionInfo;
    //in case user role is trainer
    if (userRole.name === "trainer") {
      additionInfo = await user.findById(user.trainerInfoId[0]);
      let trainerType = await Type.findById(additionInfo.typeId[0]);
      req.userInfo = {
        _id,
        username,
        password,
        name,
        roleId,
        infoId: additionInfo._id || "",
        email: additionInfo.email || "",
        workingPlace: additionInfo.workingPlace || "",
        phoneNumber: additionInfo.phoneNumber || "",
        typeId: additionInfo.typeId[0] || "",
        type: trainerType.name || "",
        role: userRole.name || "",
      };
    } else if (userRole.name === "trainee") {
      additionInfo = await TrainerInfo.findById(user.traineeInfoId[0]);
      let programming = await Type.findById(additionInfo.programmingId[0]);
      req.userInfo = {
        _id,
        username,
        password,
        name,
        roleId,
        infoId: additionInfo._id || "",
        dateOfBirth: additionInfo.dateOfBirth || "",
        age: additionInfo.age || "",
        email: additionInfo.email || "",
        educatation: additionInfo.educatation || "",
        programmingId: additionInfo.programmingId || "",
        programming: programming.name || "",
        TOEICScore: additionInfo.TOEICScore || "",
        experienceDetails: additionInfo.experienceDetails || "",
        department: additionInfo.department || "",
        role: userRole.name || "",
      };
    } else {
      res.status(500).json({
        message: {
          mesBody: "account does not exist or account role is incorrect",
        },
        mesError: true,
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: { mesBody: "Errors" },
      mesError: true,
    });
    next(error);
  }
});

userRoute.get("/detail/:courseId", (req, res, next) => {
  res.status(200).json({ message: { course: req.course }, mesError: false });
});

userRoute.use("/profile", extendRoute);

module.exports = userRoute;
