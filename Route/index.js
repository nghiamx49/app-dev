const express = require("express");
const index = express();
const adminRoute = require("./Admin.Route");
const staffRoute = require("./TrainingStaff.Route");
const trainerRoute = require("./Trainer.Route");
const traineeRoute = require("./Trainee.Route");

index.use("/admin", adminRoute);
index.use("/stafff", staffRoute);
index.use("/trainer", trainerRoute);
index.use("/trainee", traineeRoute);

module.exports = index;
