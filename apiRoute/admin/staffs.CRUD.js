const express = require("express");
const staffCRUD = express.Router();
const db = require("../../Model/db.Connection");
const User = db.users;
const Role = db.roles;
//const passport = require("passport");
// const Jwt = require("jsonwebtoken");

staffCRUD.get("/", async (req, res, next) => {
  try {
    let staffRole = await Role.findOne({ name: "staff" });
    let staffs = await User.find({ roleId: staffRole._id });
    res.status(200).json({
      message: { staffs: staffs.map((staff) => staff._id) },
      mesError: false,
    });
  } catch (error) {
    res.status(500).json({
      message: { mesBody: "No staff found in application" },
      mesError: true,
    });
    next(error);
  }
});

staffCRUD.post(
  "/create",
  //verifySignUp.checkDuplicateUserName,
  async (req, res) => {
    const { username, password, name } = req.body;
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
        let findRole = await Role.findOne({ name: "staff" });
        newUser.roleId = findRole;
        let result = await newUser.save();
        if (result) {
          res.status(200).json({
            message: {
              mesBody: "Created staff account successfully",
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
//use to check parameter staffId for get detail, update and delete
staffCRUD.param("staffId", async (req, res, next, staffId) => {
  try {
    let staff = await User.findById(staffId);
    const { _id, username, password, name } = staff;
    req.staff = {
      _id,
      username,
      password,
      name,
      role: "staff",
    };
    next();
  } catch (error) {
    res.status(500).json({
      message: { mesBody: " staff account does not exist" },
      mesError: true,
    });
    next(error);
  }
});

staffCRUD.get("/detail/:staffId", async (req, res, next) => {
  try {
    res.status(200).json({ message: req.staff });
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

staffCRUD.put("/edit/:staffId", async (req, res, next) => {
  try {
    const { username, password, name } = req.body;
    const { _id } = req.staff;
    let staff = await User.findById(_id);
    staff.username = username;
    staff.password = password;
    staff.name = name;
    await staff.save();
    res.status(200).json({
      message: { mesBody: "Edit staff profile sucess" },
      mesError: false,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

staffCRUD.delete("/delete/:staffId", async (req, res, next) => {
  const { _id } = req.staff;
  try {
    await User.deleteOne({ _id: _id });
    res.status(200).json({
      message: { mesBody: "Delete staff account sucessfully" },
      mesError: false,
    });
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});
module.exports = staffCRUD;
