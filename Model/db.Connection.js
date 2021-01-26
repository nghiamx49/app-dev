const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.users = require("./Users.Model");
db.roles = require("./Roles.Model");
db.categories = require("./Categories.Model");
db.courses = require("./Courses.Model");
db.programmings = require("./Programming.Model");
db.realatedCourses = require("./RelatedCourses.Model");
db.traineeInfo = require("./TraineeInfo.Mode");
db.trainerInfo = require("./TrainerInfo.Model");
db.trainerTypes = require("./TrainerTypes.Model");

const User = db.users;
const Roles = db.roles;
const Types = db.trainerTypes;
const Programming = db.programmings;

//initailize data snippet
db.initialize = () => {
  //initial roles
  db.roles.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Roles({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error" + error);
        }
      });

      new Roles({
        name: "staff",
      }).save((err) => {
        if (err) {
          console.log("error" + error);
        }
      });

      new Roles({
        name: "trainer",
      }).save((err) => {
        if (err) {
          console.log("error" + error);
        }
      });
      new Roles({
        name: "trainee",
      }).save((err) => {
        if (err) {
          console.log("error" + error);
        }
      });
    }
  });
  db.trainerTypes.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Types({
        name: "Internal Type",
      }).save((err) => console.log(err));
      new Types({
        name: "External Type",
      }).save((err) => console.log(err));
    }
  });
  db.programmings.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Programming({
        name: "Node.JS",
      }).save((err) => console.log(err));
      new Programming({
        name: ".NET Core",
      }).save((err) => console.log(err));
      new Programming({
        name: "Python",
      }).save((err) => console.log(err));
      new Programming({
        name: "React.JS",
      }).save((err) => console.log(err));
    }
  });
  db.users.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new User({
        username: "admin",
        password: "admin",
        name: "Mai Xuan Nghia",
        roleId: Roles.find({ name: "admin" }),
      });
    }
  });
};

module.exports = db;
