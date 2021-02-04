const express = require("express");
const adminApi = express.Router();
const staffCRUD = require("./staffs.CRUD");
const trainerCURD = require("./trainer.CRUD");
const passport = require("passport");
const passportConf = require("../../Middleware/Auth.Middleware");
const checkRole = require("../../Middleware/checkRole.Middleware");
const db = require("../../Migrations/db.Connection");
const User = db.users;
const Role = db.roles;
//refer to stafCRUD

adminApi.use(passport.authenticate("jwt", { session: false }));
adminApi.use(checkRole.isAdmin);

adminApi.get("/systeminfo", async (req, res, next) => {
  try {
    let trainerRole = await Role.findOne({ name: "trainer" });
    let staffRole = await Role.findOne({ name: "staff" });
    let trainers = await User.find({ roleId: trainerRole });
    let staffs = await User.find({ roleId: staffRole });
    res.status(200).json({
      message: { trainer: trainers.length, staff: staffs.length },
      mesError: false,
    });
  } catch (error) {
    next(error);
  }
});

adminApi.use("/staffs", staffCRUD);

//refer to trainerCRUD
adminApi.use("/trainers", trainerCURD);

module.exports = adminApi;
