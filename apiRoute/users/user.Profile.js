const express = require("express");
const userProfile = express.Router({ mergeParams: true });
const db = require("../../Migrations/db.Connection");
const userRelatedCourses = require("./user.RelatedCourses");
const User = db.users;
const Role = db.roles;

userProfile.param("userId", async (req, res, next, userId) => {
  try {
    let user = await User.findById(userId);
    if (!user) {
      res
        .status(201)
        .json({ message: { mesBody: "User not found" }, mesError: true });
    }
    const { username, password, name, roleId } = user;
    let role = await Role.findById(user.roleId);
    req.userInfo = {
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
});

userProfile.post("/:userId", async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    const { newPassword } = req.body;
    let user = await User.findById(_id);
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

userProfile.get("/:userId/relatedcourses", userRelatedCourses);

module.exports = userProfile;
