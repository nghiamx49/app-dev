const express = require("express");
const courseRoute = express.Router();
const staffCRUD = require("./staffs.CRUD");
const trainerCURD = require("./trainer.CRUD");
const authJwt = require("../../Middleware/Auth.Middleware");
const db = require("../../Model/db.Connection");
const Course = db.courses;
const Category = db.categories;
//refer to stafCRUD
courseRoute.get("/courses", (req, res, next) => {});

//refer to trainerCRUD
courseRoute.param(":courseId", async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res
      .status(400)
      .json({ message: { mesBody: "required an paramerter" }, mesError: true });
  } else if (id) {
    let findCourse = await Course.findOne({ id: id });
    if(findCourse) {
        
    }
  }
});
module.exports = courseRoute;
