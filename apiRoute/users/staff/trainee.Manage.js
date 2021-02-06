const express = require("express");
const traineeManager = express.Router({ mergeParams: true });
const db = require("../../../Migrations/db.Connection");
const userRelatedCourses = require("../user.RelatedCourses");
const bcrypt = require("bcryptjs");
const User = db.users;
const Role = db.roles;
const TraineeInfo = db.traineeInfo;
const Programming = db.programmings;
const RelatedCourses = db.relatedCourses;
const checkRole = require("../../../Middleware/checkRole.Middleware");
// const passport = require("passport");
// const Jwt = require("jsonwebtoken");

traineeManager.use(checkRole.isStaff);
traineeManager.get("/", async (req, res, next) => {
  try {
    let trainerRole = await Role.findOne({ name: "trainee" });
    const allTrainees = await User.find({ roleId: trainerRole._id });
    if (!allTrainees) {
      res.status(404).json({
        message: { mesBody: "Cannot found any trainees" },
        mesError: true,
      });
    }
    const trainees = await Promise.all(
      allTrainees.map(async (trainee) => {
        const { _id, username, name } = trainee;
        let info = await TraineeInfo.findById(trainee.traineeInfoId[0]);
        let programming = await Programming.findById(info.programmingId[0]);
        let obj = {
          _id,
          username,
          name,
          programming: programming.name,
          TOEICScore: info.TOEICScore,
        };
        return obj;
      })
    );
    res.status(200).json({ message: { trainees: trainees }, mesError: false });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});

//return programming optional to choose
traineeManager.get("/programmingoptional", async (req, res, next) => {
  try {
    let programmings = await Programming.find({});
    res
      .status(200)
      .json({ message: { programmings: programmings }, mesError: false });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});
traineeManager.param("userId", async (req, res, next, userId) => {
  try {
    let user = await User.findById(userId);
    if (!user) {
      res
        .status(404)
        .json({ message: { mesBody: "User not found" }, mesError: true });
    }
    const { _id, username, password, name, roleId, traineeInfoId } = user;
    let userRole = await Role.findById(roleId[0]);
    if (userRole.name !== "trainee") {
      res.status(400).json({
        message: { mesBody: "This user doesn't a trainee" },
        mesError: true,
      });
    }
    //in case user role is trainer
    let additionInfo = await TraineeInfo.findById(traineeInfoId[0]);
    const {
      dateOfBirth,
      programmingId,
      age,
      email,
      TOEICScore,
      experienceDetails,
      department,
    } = additionInfo;
    let programming = await Programming.findById(programmingId[0]);
    req.userInfo = {
      _id,
      username,
      password,
      name,
      roleId,
      infoId: additionInfo._id || "",
      dateOfBirth,
      age,
      email,
      programming: programming.name || "",
      TOEICScore,
      experienceDetails,
      department,
      role: userRole.name || "",
    };
    next();
  } catch (error) {
    res.status(500).json({
      message: { mesBody: "Errors" },
      mesError: true,
    });
    next(error);
  }
});

//get all trainee profile information
traineeManager.get("/profile/:userId", async (req, res, next) => {
  try {
    res
      .status(200)
      .json({ message: { trainee: req.userInfo }, mesError: false });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});

traineeManager.put("/changepassword/:userId", async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { _id } = req.userInfo;
    let userUpdate = await User.findById(_id);
    let result = await bcrypt.compare(oldPassword, userUpdate.password);
    if (result === false) {
      res.status(400).json({
        message: { mesBody: "Old password is wrong" },
        mesError: true,
      });
    }
    userUpdate.password = newPassword;
    await userUpdate.save();
    res.status(200).json({
      message: { mesBody: "Update password of chosen trainee successfully" },
      mesError: false,
    });
    next(error);
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});

//create new trainee account
traineeManager.post("/create", async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      dateOfBirth,
      age,
      email,
      programming,
      TOEICScore,
      experienceDetails,
      department,
    } = req.body;
    let programmingId = await Programming.find({ name: programming });
    let traineeInfoId = await new TraineeInfo({
      dateOfBirth,
      age,
      email,
      programmingId,
      TOEICScore,
      experienceDetails,
      department,
    });
    await traineeInfoId.save();
    let roleId = await Role.find({ name: "trainee" });
    let trainee = await new User({
      username,
      password,
      name,
      roleId,
      traineeInfoId,
    });
    await trainee.save();
    res.status(200).json({
      message: { mesBody: "create trainee successfully" },
      mesError: false,
    });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});

//can use to edit trainee profile
traineeManager.put("/edit/:userId", async (req, res, next) => {
  try {
    const {
      dateOfBirth,
      age,
      email,
      educatation,
      programming,
      TOEICScore,
      experienceDetails,
      department,
      name,
      username,
    } = req.body;
    const { _id, infoId } = req.userInfo;
    let updateProgramming = await Programming.find({ name: programming });
    let traineeInfo = await TraineeInfo.findById(infoId);
    traineeInfo.email = email || "";
    traineeInfo.educatation = educatation || "";
    traineeInfo.age = parseInt(age) || null;
    traineeInfo.programming = updateProgramming || "";
    traineeInfo.TOEICScore = parseInt(TOEICScore) || null;
    traineeInfo.experienceDetails = experienceDetails || "";
    traineeInfo.department = department || "";
    traineeInfo.dateOfBirth = dateOfBirth || "";
    await traineeInfo.save();
    let trainee = await User.findById(_id);
    trainee.username = username;
    trainee.name = name || "";
    trainee.traineeInfoId = traineeInfo;
    await trainee.save();
    res.status(200).json({
      message: { mesBody: "Edit trainee profile sucessfully" },
      mesError: false,
    });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});

traineeManager.delete("/delete/:userId", async (req, res, next) => {
  try {
    const { _id, infoId } = req.userInfo;
    await RelatedCourses.deleteMany({ userId: _id });
    await TraineeInfo.deleteOne({ _id: infoId });
    await User.deleteOne({ _id });
    res.status(200).json({
      message: { mesBody: "Delete trainee account successfully" },
      mesError: false,
    });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});

traineeManager.use("/profile/:userId/relatedcourses", userRelatedCourses);

module.exports = traineeManager;
