const express = require("express");
const adminApi = express.Router();
const staffCRUD = require("./staffs.CRUD");
const trainerCURD = require("./trainer.CRUD");
const passport = require("passport");
const passportConf = require("../../Middleware/Auth.Middleware");
const checkRole = require("../../Middleware/checkRole.Middleware");
//refer to stafCRUD

// adminApi.use(checkRole.isAdmin);
adminApi.use(passport.authenticate("jwt", { session: false }));

adminApi.use("/staff", staffCRUD);

//refer to trainerCRUD
adminApi.use("/trainer", trainerCURD);

module.exports = adminApi;
