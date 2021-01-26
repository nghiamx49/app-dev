const db = require("../Model/db.Connection");
const User = db.users;
const Role = db.roles;
const passport = require("passport");
const passportConf = require("./Auth.Middleware");

const isAdmin = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const findUser = await User.findById(_id);
    const findRole = await Role.findById(findUser.roleId[0]);
    const { name } = findRole;
    if (!name === "admin") {
      next();
    }
    next();
  } catch (error) {
    res.status(403).json({
      message: { mesBody: "Your dont have permission to access this page" },
      mesErorr: true,
    });
    next(error);
  }
};

const isStaff = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const findUser = await User.findById(_id);
    const findRole = await Role.findById(findUser.roleId[0]);
    const { name } = findRole;
    if (name === "staff") {
      next();
    }
  } catch (error) {
    res.status(403).json({
      message: { mesBody: "Your dont have permission to access this page" },
      mesErorr: true,
    });
    next(error);
  }
};

const isTrainer = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const findUser = await User.findById(_id);
    const findRole = await Role.findById(findUser.roleId[0]);
    const { name } = findRole;
    if (name === "trainer") {
      next();
    }
  } catch (error) {
    res.status(403).json({
      message: { mesBody: "Your dont have permission to access this page" },
      mesErorr: true,
    });
    next(error);
  }
};

const isTrainee = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const findUser = await User.findById(_id);
    const findRole = await Role.findById(findUser.roleId[0]);
    const { name } = findRole;
    if (name === "trainee") {
      next();
    }
  } catch (error) {
    res.status(403).json({
      message: { mesBody: "Your dont have permission to access this page" },
      mesErorr: true,
    });
    next(error);
  }
};

const checkRole = {
  isAdmin,
  isStaff,
  isTrainer,
  isTrainee,
};

module.exports = checkRole;
