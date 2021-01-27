const express = require("express");
const trainerManager = express.Router({ mergeParams: true });
const db = require("../../../Migrations/db.Connection");
const userRelatedCourses = require("./user.RelatedCourses");
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
    let trainerRole = await Role.find({ name: "trainer" });
    const allTrainers = await User.find({ roleId: trainerRole._id });
    const trainers = await Promise.all(
      allTrainers.map(async (trainer) => {
        trainer.role = "trainer";
        return staff;
      })
    );
    res.status(200).json({ message: { trainers: trainers }, mesError: false });
  } catch (error) {
    res.status(404).json({
      message: { mesBody: "Cannot found any trainers" },
      mesError: true,
    });
    next(error);
  }
});

//get all trainer profile information
trainerManager.get("/trainerprofile/:userId", async (req, res, next) => {
  try {
    res.status(200).json({ message: req.userInfo });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});
//can use to add/edit/remove info
trainerManager.put("/trainerprofile/:userId", async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      workingPlace,
      phoneNumber,
      email,
      trainerType,
    } = req.body;
    const { _id, infoId } = req.userInfo;
    let updateType = await Type.find({ name: trainerType });
    let trainerInfo = await TrainerInfo.findById(infoId);
    trainerInfo.email = email || "";
    trainerInfo.phoneNumber = phoneNumber || "";
    trainerInfo.workingPlace = workingPlace || "";
    trainerInfo.typeId = updateType || "";
    await trainerInfo.save();
    let trainer = await User.findById(_id);
    trainer.username = username;
    trainer.password = password;
    trainer.name = name || "";
    trainer.trainerInfoId = trainerInfo;
    await trainer.save();
    res.status(200).json({
      message: { mesBody: "Edit trainer profile sucess" },
      mesError: false,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

trainerManager.use("/trainerprofile/:userId/relatedcoures", userRelatedCourses);

module.exports = trainerManager;
