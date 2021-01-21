const express = require("express");
const trainerRoute = express();
const trainerController = require("../Controller/trainer/Trainer.Controller");

adminRoute.use("/", trainerController);

module.exports = trainerRoute;
