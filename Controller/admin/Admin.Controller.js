const express = require("express");
const adminController = express.Router();
const staffCRUD = require("./staffs.CRUD");
const trainerCURD = require("./trainer.CRUD");

//refer to stafCRUD
adminController.get("/staff", staffCRUD);

//refer to trainerCRUD
adminController.get("/trainer", trainerCURD);

module.exports = adminController;
