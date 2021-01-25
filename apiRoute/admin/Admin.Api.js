const express = require("express");
const adminApi = express.Router();
const staffCRUD = require("./staffs.CRUD");
const trainerCURD = require("./trainer.CRUD");
const authJwt = require("../../Middleware/Auth.Middleware");
const { db } = require("../../Model/Users.Model");

//refer to stafCRUD
adminApi.use("/staff", staffCRUD);

//refer to trainerCRUD
adminApi.use("/trainer", trainerCURD);

module.exports = adminApi;
