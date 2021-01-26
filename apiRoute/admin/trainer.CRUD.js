const express = require("express");
const trainerCRUD = express.Router();
const db = require("../../Model/db.Connection");
const User = db.users;
const Role = db.roles;
const TrainerInfo = db.trainerInfo;
const Type = db.trainerTypes;
// const passport = require("passport");
// const Jwt = require("jsonwebtoken");

trainerCRUD.get("/", async (req, res, next) => {
  try {
    let trainerRole = await Role.findOne({ name: "trainer" });
    let trainers = await User.find({ roleId: trainerRole._id });
    res.status(200).json({
      message: { trainers: trainers.map((trainer) => trainer._id) },
      mesError: false,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

trainerCRUD.post(
  "/create",
  //verifySignUp.checkDuplicateUserName,
  async (req, res) => {
    const {
      username,
      password,
      name,
      workingPlace,
      phoneNumber,
      email,
      trainerType,
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

        let type = await Type.findOne({ name: trainerType });
        trainerInfo.typeId = type;
        let saveTrainerInfo = await trainerInfo.save();
        newUser.trainerInfoId = saveTrainerInfo;
        let result = await newUser.save();
        if (result) {
          res.status(200).json({
            message: {
              mesBody: "Created trainer account successfully",
              mesError: false,
              role: newUser.roleId,
            },
          });
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: { mesBody: "Error had occur", mesError: true } });
    }
  }
);
//use to check parameter trainerId for get detail, update and delete
trainerCRUD.param("trainerId", async (req, res, next, trainerId) => {
  try {
    let trainer = await User.findById(trainerId);
    let additionInfo = await TrainerInfo.findById(trainer.trainerInfoId[0]);
    let trainerType = await Type.findById(additionInfo.typeId[0]);
    const { _id, username, password, name } = trainer;
    req.trainer = {
      _id,
      username,
      password,
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
      message: { mesBody: " trainer account does not exist" },
      mesError: true,
    });
    next(error);
  }
});

trainerCRUD.get("/detail/:trainerId", async (req, res, next) => {
  try {
    res.status(200).json({ message: req.trainer });
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

trainerCRUD.put("/edit/:trainerId", async (req, res, next) => {
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
    const { _id, infoId } = req.trainer;
    let updateType = await Type.find({ name: trainerType });
    let trainerInfo = await TrainerInfo.findById(infoId);
    trainerInfo.email = email;
    trainerInfo.phoneNumber = phoneNumber;
    trainerInfo.workingPlace = workingPlace;
    trainerInfo.typeId = updateType;
    await trainerInfo.save();
    let trainer = await User.findById(_id);
    trainer.username = username;
    trainer.password = password;
    trainer.name = name;
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

trainerCRUD.delete("/delete/:trainerId", async (req, res, next) => {
  const { _id } = req.trainer;
  try {
    await User.deleteOne({ _id: _id });
    res.status(200).json({
      message: { mesBody: "Delete trainer account sucessfully" },
      mesError: false,
    });
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});
module.exports = trainerCRUD;
