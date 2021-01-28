const express = require("express");
const userRoute = express.Router();
const db = require("../../Migrations/db.Connection");
const passport = require("passport");
const passportConf = require("../../Middleware/Auth.Middleware");
const trainerManager = require("./staff/trainer.Manage");
const traineeManager = require("./staff/trainee.Manage");
const courseCRUD = require("./courses.CRUD");
const categoryCRUD = require("./categories.CRUD");

//after logged into application, use will had access right to this route based on their role
userRoute.use(passport.authenticate("jwt", { session: false }));

userRoute.use("/courses", courseCRUD);
//all any user can se their own profile and related courses
userRoute.use("/categories", categoryCRUD);
//manage trainer profile and related courses by staff role
userRoute.use("/trainers", trainerManager);
userRoute.use("/trainees", traineeManager);

module.exports = userRoute;
