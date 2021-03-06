const express = require("express");
const trainerManager = express.Router({ mergeParams: true });
const db = require("../../../Migrations/db.Connection");
const userRelatedCourses = require("../user.RelatedCourses");
const User = db.users;
const Role = db.roles;
const TrainerInfo = db.trainerInfo;
const Type = db.trainerTypes;
const checkRole = require("../../../Middleware/checkRole.Middleware");
// const passport = require("passport");
// const Jwt = require("jsonwebtoken");

trainerManager.use(checkRole.isStaff);
trainerManager.get("/", async (req, res, next) => {
  try {
    let trainerRole = await Role.findOne({ name: "trainer" });
    const allTrainers = await User.find({ roleId: trainerRole._id });
    if (!allTrainers) {
      res.status(404).json({
        message: { mesBody: "Cannot found any trainers" },
        mesError: true,
      });
    }
    const trainers = await Promise.all(
      allTrainers.map(async (trainer) => {
        trainer.role = "trainer";
        await trainer.save();
        return trainer;
      })
    );
    res.status(200).json({ message: { trainers: trainers }, mesError: false });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});

trainerManager.param("userId", async (req, res, next, userId) => {
  try {
    let user = await User.findById(userId);
    if (!user) {
      res
        .status(404)
        .json({ message: { mesBody: "User not found" }, mesError: true });
    }
    const { _id, username, password, name, roleId, trainerInfoId } = user;
    let userRole = await Role.findById(roleId[0]);
    if (userRole.name !== "trainer") {
      res.status(400).json({
        message: { mesBody: "This user doesn't a trainer" },
        mesError: true,
      });
    }
    //in case user role is trainer
    let additionInfo = await TrainerInfo.findById(trainerInfoId[0]);
    const { typeId } = additionInfo;
    let trainerType = await Type.findById(typeId[0]);
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
    next();
  } catch (error) {
    res.status(500).json({
      message: { mesBody: "Errors" },
      mesError: true,
    });
    next(error);
  }
});

//get all trainer profile information
trainerManager.get("/profile/:userId", async (req, res, next) => {
  try {
    res
      .status(200)
      .json({ message: { trainer: req.userInfo }, mesError: false });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});

//can use to add/edit/remove info
trainerManager.put("/profile/:userId", async (req, res, next) => {
  try {
    const { username, name, workingPlace, phoneNumber, email, type } = req.body;
    const { _id, infoId } = req.userInfo;
    let updateType = await Type.find({ name: type });
    let trainerInfo = await TrainerInfo.findById(infoId);
    trainerInfo.email = email || "";
    trainerInfo.phoneNumber = phoneNumber || "";
    trainerInfo.workingPlace = workingPlace || "";
    trainerInfo.typeId = updateType || "";
    await trainerInfo.save();
    let trainer = await User.findById(_id);
    trainer.username = username;
    trainer.name = name || "";
    trainer.trainerInfoId = trainerInfo;
    await trainer.save();
    res.status(200).json({
      message: { mesBody: "Edit trainer profile sucess" },
      mesError: false,
    });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});

trainerManager.use("/profile/:userId/relatedcourses", userRelatedCourses);

module.exports = trainerManager;
