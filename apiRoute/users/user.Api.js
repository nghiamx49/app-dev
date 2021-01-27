const express = require("express");
const userRoute = express.Router();
const db = require("../../Migrations/db.Connection");
const passport = require("passport");
const passportConf = require("../../Middleware/Auth.Middleware");
const User = db.users;
const Course = db.courses;
const Category = db.categories;
const userProfile = require("./user.Profile");
const trainerManager = require("./staff/trainer.Manage");
const traineeManager = require("./staff/trainee.Manage");
const courseCRUD = require("./courses.CRUD");
const categoryCRUD = require("./categories.CRUD");

//after logged into application, use will had access right to this route based on their role
userRoute.use(passport.authenticate("jwt", { session: false }));

//find user by id and return an object contains information of this user
userRoute.param("userId", async (req, res, next, userId) => {
  try {
    let user = await User.findById(userId);
    if (!user) {
      res
        .status(404)
        .json({ message: { mesBody: "User not found" }, mesError: true });
    }
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
          mesBody: "account role is incorrect",
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
userRoute.use("/courses", courseCRUD);
//all any user can se their own profile and related courses
userRoute.use("/profile", userProfile);
userRoute.use("/cateogories", categoryCRUD);
//manage trainer profile and related courses by staff role
userRoute.use("/trainers", trainerManager);
userRoute.use("/trainees", traineeManager);

module.exports = userRoute;
