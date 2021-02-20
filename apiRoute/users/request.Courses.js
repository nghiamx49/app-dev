const express = require("express");
const requestRoute = express.Router();
const db = require("../../Migrations/db.Connection");
const passport = require("passport");
const passportConf = require("../../Middleware/Auth.Middleware");
const Requests = db.request;
const RelatedCourses = db.relatedCourses;
const Courses = db.courses;
const Users = db.users;
const checkRole = require("../../Middleware/checkRole.Middleware");

requestRoute.get("/", checkRole.isStaff, async (req, res, next) => {
  try {
    let allRequests = await Requests.find({ apply: 0 });
    res
      .status(200)
      .json({ message: { allRequests: allRequests }, mesError: false });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Errors" }, mesError: true });
  }
});

requestRoute.post("/join", checkRole.isTrainee, async (req, res, next) => {
  try {
    const { username, courseName } = req.body;
    let findCouse = await Courses.findOne({ name: courseName });
    let findUser = await Users.findOne({ username });
    let checkIfExistRC = await RelatedCourses.findOne({
      courseId: findCouse._id,
      userId: findUser._id,
    });
    if (checkIfExistRC) {
      res.status(400).json({
        message: { mesBody: "Your have already joined this courses" },
        mesError: true,
      });
      return;
    }
    let checkIfExistRequest = await Requests.findOne({ username, courseName });
    if (checkIfExistRequest) {
      res.status(400).json({
        message: { mesBody: "Your have requested to join this courses" },
        mesError: true,
      });
      return;
    }
    let newRequest = await new Requests({ username, courseName, apply: 0 });
    await newRequest.save();
    res.status(200).json({
      message: { mesBody: "Request to join this course succeed" },
      mesError: false,
    });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Errors" }, mesError: true });
  }
});

requestRoute.post(
  "/allow/:requestId",
  checkRole.isStaff,
  async (req, res, next) => {
    try {
      const { requestId } = req.params;
      const { username, courseName } = req.body;
      let request = await Requests.findById(requestId);
      let user = await Users.findOne({ username });
      let course = await Courses.findOne({ name: courseName });
      let newRC = await new RelatedCourses({
        userId: user,
        courseId: course,
      });
      await newRC.save();
      request.apply = 1;
      await request.save();
      res.status(200).json({
        message: { mesBody: "allow request succeed" },
        mesError: false,
      });
    } catch (error) {
      res.status(500).json({ message: { mesBody: "Errors" }, mesError: true });
    }
  }
);

requestRoute.delete(
  "/reject/:requestId",
  checkRole.isStaff,
  async (req, res, next) => {
    try {
      const { requestId } = req.params;
      await Requests.deleteOne({ _id: requestId });
      res.status(200).json({
        message: { mesBody: "reject request succeed" },
        mesError: false,
      });
    } catch (error) {
      res.status(500).json({ message: { mesBody: "Errors" }, mesError: true });
    }
  }
);

module.exports = requestRoute;
