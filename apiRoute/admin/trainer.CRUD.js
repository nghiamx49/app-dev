const express = require("express");
const trainerCRUD = express.Router();
const db = require("../../Migrations/db.Connection");
const User = db.users;
const Role = db.roles;
const TrainerInfo = db.trainerInfo;
const Type = db.trainerTypes;
const bcrypt = require("bcryptjs");
// const passport = require("passport");
// const Jwt = require("jsonwebtoken");

trainerCRUD.get("/", async (req, res, next) => {
  try {
    let trainerRole = await Role.findOne({ name: "trainer" });
    const allTrainers = await User.find({ roleId: trainerRole._id });
    if (!allTrainers.length) {
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

trainerCRUD.post("/create", async (req, res) => {
  const {
    username,
    password,
    name,
    workingPlace,
    phoneNumber,
    email,
    type,
  } = req.body;
  // Create a new user
  try {
    let user = await User.findOne({ username });
    if (user) {
      res.status(400).json({
        message: { mesBody: "Username had already taken", mesError: true },
      });
    } else {
      const newUser = new User({
        username,
        password,
        name,
      });
      let findRole = await Role.findOne({ name: "trainer" });
      newUser.roleId = findRole;
      let trainerInfo = new TrainerInfo({
        workingPlace,
        email,
        phoneNumber,
      });

      let findType = await Type.findOne({ name: type });
      trainerInfo.typeId = findType;
      let saveTrainerInfo = await trainerInfo.save();
      newUser.trainerInfoId = saveTrainerInfo;
      let result = await newUser.save();
      if (result) {
        res.status(200).json({
          message: {
            mesBody: "Created trainer account successfully",
          },
          mesError: false,
        });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: { mesBody: "Error had occur" }, mesError: true });
  }
});

//use to check parameter trainerId for get detail, update and delete
trainerCRUD.param("trainerId", async (req, res, next, trainerId) => {
  try {
    let trainer = await User.findById(trainerId);
    if (!trainer) {
      res.status(404).json({
        message: { mesBody: "Cannot found trainer" },
        mesError: true,
      });
    }
    let additionInfo = await TrainerInfo.findById(trainer.trainerInfoId[0]);
    let trainerType = await Type.findById(additionInfo.typeId[0]);
    const { _id, username, password, name } = trainer;
    req.trainer = {
      _id,
      username,
      name,
      infoId: additionInfo._id || "",
      email: additionInfo.email || "",
      workingPlace: additionInfo.workingPlace || "",
      phoneNumber: additionInfo.phoneNumber || "",
      typeId: additionInfo.typeId[0] || "",
      type: trainerType.name || "",
      role: "trainer",
    };
    next();
  } catch (error) {
    res.status(500).json({
      message: { mesBody: "Erorrs" },
      mesError: true,
    });
    next(error);
  }
});

trainerCRUD.get("/detail/:trainerId", async (req, res, next) => {
  try {
    res.status(200).json({ message: req.trainer });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});

trainerCRUD.put("/changepassword/:trainerId", async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    console.log(oldPassword + " " + newPassword);
    const { _id } = req.trainer;
    let trainerUpdate = await User.findById(_id);
    let result = await bcrypt.compare(oldPassword, trainerUpdate.password);
    console.log(result);
    if (result === false) {
      res.status(400).json({
        message: { mesBody: "Old password is wrong" },
        mesError: true,
      });
    }
    trainerUpdate.password = newPassword;
    await trainerUpdate.save();
    res.status(200).json({
      message: { mesBody: "Update password of chosen user successfully" },
      mesError: false,
    });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});

trainerCRUD.put("/edit/:trainerId", async (req, res, next) => {
  try {
    const { username, name, workingPlace, phoneNumber, email, type } = req.body;
    const { _id, infoId } = req.trainer;
    let updateType = await Type.find({ name: type });
    let trainerInfo = await TrainerInfo.findById(infoId);
    trainerInfo.email = email;
    trainerInfo.phoneNumber = phoneNumber;
    trainerInfo.workingPlace = workingPlace;
    trainerInfo.typeId = updateType;
    await trainerInfo.save();
    let trainer = await User.findById(_id);
    trainer.username = username;
    trainer.name = name;
    trainer.trainerInfoId = trainerInfo;
    await trainer.save();
    res.status(200).json({
      message: { mesBody: "Edit trainer profile sucessfully" },
      mesError: false,
    });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});

trainerCRUD.delete("/delete/:trainerId", async (req, res, next) => {
  const { _id, infoId } = req.trainer;
  try {
    await TrainerInfo.deleteOne({ _id: infoId });
    await User.deleteOne({ _id: _id });
    res.status(200).json({
      message: { mesBody: "Delete trainer account sucessfully" },
      mesError: false,
    });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});
module.exports = trainerCRUD;
