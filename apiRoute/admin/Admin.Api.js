const express = require("express");
const adminApi = express.Router();
const staffCRUD = require("./staffs.CRUD");
const trainerCURD = require("./trainer.CRUD");
const passport = require("passport");
const checkRole = require("../../Middleware/checkRole.Middleware");
//refer to stafCRUD
adminApi.use(
  "/staff",
  [passport.authenticate("jwt", { session: false }), checkRole.isAdmin],
  staffCRUD
);

//refer to trainerCRUD
adminApi.use(
  "/trainer",
  [passport.authenticate("jwt", { session: false }), checkRole.isAdmin],
  trainerCURD
);

module.exports = adminApi;
