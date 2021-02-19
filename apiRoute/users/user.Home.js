const express = require("express");
const userRoute = express.Router();
const db = require("../../Migrations/db.Connection");
const User = db.users;
const Role = db.roles;
const Course = db.courses;
const Category = db.categories;
const passport = require("passport");
const passportConf = require("../../Middleware/Auth.Middleware");
const trainerManager = require("./staff/trainer.Manage");
const traineeManager = require("./staff/trainee.Manage");
const courseCRUD = require("./courses.CRUD");
const checkRole = require("../../Middleware/checkRole.Middleware");
const categoryCRUD = require("./categories.CRUD");
const requestRoute = require("./request.Courses");

//after logged into application, use will had access right to this route based on their role
userRoute.use(passport.authenticate("jwt", { session: false }));

userRoute.get("/systeminfo", checkRole.isStaff, async (req, res, next) => {
  try {
    let courses = await Course.find({});
    let categories = await Category.find({});
    let trainerRole = await Role.findOne({ name: "trainer" });
    let trainers = await User.find({ roleId: trainerRole._id });
    let traieeRole = await Role.findOne({ name: "trainee" });
    let trainees = await User.find({ roleId: traieeRole._id });
    res.status(200).json({
      message: {
        courses: courses.length,
        categories: categories.length,
        trainers: trainers.length,
        trainees: trainees.length,
      },
      mesError: false,
    });
  } catch (error) {
    next(error);
  }
});

userRoute.use("/courses", courseCRUD);
//all any user can se their own profile and related courses
userRoute.use("/categories", categoryCRUD);
//manage trainer profile and related courses by staff role
userRoute.use("/trainers", trainerManager);
userRoute.use("/trainees", traineeManager);
userRoute.use("/requests", requestRoute);

module.exports = userRoute;
