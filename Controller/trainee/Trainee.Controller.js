const express = require("express");
const traineeController = express.Router();

traineeController.get("/courses", (req, res, next) => {});

traineeController.get("/allcourses", (req, res, next) => {});
module.exports = traineeController;
