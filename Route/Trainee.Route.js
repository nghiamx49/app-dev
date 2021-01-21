const express = require("express");
const traineeRoute = express();
const traineeController = require("../Controller/trainee/Trainee.Controller");

adminRoute.use("/", traineeController);

module.exports = traineeRoute;
