const express = require("express");
const traineeApi = express.Router();

traineeApi.get("/courses", (req, res, next) => {});

traineeApi.get("/allcourses", (req, res, next) => {});
module.exports = traineeApi;
