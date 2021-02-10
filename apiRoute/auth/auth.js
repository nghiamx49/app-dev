const express = require("express");
const authRoute = express.Router();
const db = require("../../Migrations/db.Connection");
const User = db.users;
const Role = db.roles;
const passport = require("passport");
const Jwt = require("jsonwebtoken");

const signToken = (userId) => {
  return Jwt.sign(
    {
      issues: "TAM-Application",
      subject: userId,
    },
    "TAM-Application",
    { expiresIn: "86400s" }
  );
};

authRoute.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    if (req.isAuthenticated()) {
      const { _id, username, roleId, name } = req.user;
      const findRole = await Role.findById(roleId);
      const role = findRole.name;
      const token = signToken(_id);
      res.cookie("access-token", token, {
        httpOnly: true,
      });
      res.status(200).json({
        isAuthenticated: true,
        name,
        user: { _id, username, role },
        message: { mesBody: "login successful" },
        mesError: false,
      });
      next();
    } else {
      res
        .status(401)
        .json({ message: { mesBody: "Unauthorized" }, mesError: true });
    }
  }
);

authRoute.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { _id, username, roleId, name } = req.user;
      let findRole = await Role.findById(roleId[0]);
      res.status(200).json({
        isAuthenticated: true,
        user: { _id, username, name: name, role: findRole.name },
      });
    } catch (error) {
      res.status(500).json({ message: { mesBody: "Errors" }, mesError: true });
    }
  }
);

authRoute.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access-token");
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

module.exports = authRoute;
