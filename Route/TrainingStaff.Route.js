const express = require("express");
const staffRoute = express();
const staffController = require("../Controller/staffs/TraningStaff.Controller");

adminRoute.use("/", staffController);

module.exports = staffRoute;
