const express = require("express");
const userProfile = express.Router({ mergeParams: true });
const db = require("../../Migrations/db.Connection");
const userRelatedCourses = require("./user.RelatedCourses");
const User = db.users;
const Role = db.roles;
const TraineeInfo = db.traineeInfo;
const TrainerInfo = db.trainerInfo;
const Type = db.trainerTypes;
const Programming = db.programmings;
const bcrypt = require("bcryptjs");

userProfile.param("userId", async (req, res, next, userId) => {
  try {
    let user = await User.findById(userId);
    if (!user) {
      res
        .status(404)
        .json({ message: { mesBody: "User not found" }, mesError: true });
    }
    const { _id, username, password, name, roleId } = user;
    let role = await Role.findById(user.roleId);
    if (role.name === "trainee") {
      let traineeInfo = await TraineeInfo.findById(user.traineeInfoId[0]);
      const {
        dateOfBirth,
        age,
        email,
        education,
        programmingId,
        TOEICScore,
        experienceDetails,
        department,
      } = traineeInfo;
      let programing = await Programming.findById(programmingId[0]);
      req.userInfo = {
        _id,
        username,
        password,
        name,
        roleId,
        role: role.name || "",
        programming: programing.name,
        dateOfBirth,
        age,
        email,
        education,
        TOEICScore,
        experienceDetails,
        department,
      };
      next();
    } else if (role.name == "trainer") {
      let trainerInfo = await TrainerInfo.findById(user.trainerInfoId[0]);
      const { workingPlace, phoneNumber, email, typeId } = trainerInfo;
      let type = await Type.findById(typeId[0]);
      req.userInfo = {
        _id,
        username,
        password,
        name,
        roleId,
        role: role.name || "",
        workingPlace,
        phoneNumber,
        email,
        type: type.name,
      };
      next();
    }
    req.userInfo = {
      _id,
      username,
      password,
      name,
      roleId,
      role: role.name || "",
    };
    next();
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});

userProfile.get("/:userId", (req, res, next) => {
  res
    .status(200)
    .json({ message: { userInfo: req.userInfo }, mesError: false });
    next();
});

userProfile.put("/changepassword/:userId", async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    const { oldPassword, newPassword } = req.body;
    let user = await User.findById(_id);
    let result = await bcrypt.compare(oldPassword, user.password);
    if (result === false) {
      res.status(200).json({
        message: { mesBody: "Old password is wrong" },
        mesError: true,
      });
    }
    user.password = newPassword;
    await user.save();
    res
      .status(200)
      .json({ message: { mesBody: "Password had changed" }, mesError: false });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});

userProfile.use("/:userId/relatedcourses", userRelatedCourses);

module.exports = userProfile;
