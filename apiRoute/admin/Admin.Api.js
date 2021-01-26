const express = require("express");
const adminApi = express.Router();
const staffCRUD = require("./staffs.CRUD");
const trainerCURD = require("./trainer.CRUD");
//refer to stafCRUD
adminApi.use("/staff", staffCRUD);

//refer to trainerCRUD
adminApi.use("/trainer", trainerCURD);

module.exports = adminApi;
