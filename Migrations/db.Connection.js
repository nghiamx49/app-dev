const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.users = require("../Model/Users.Model");
db.roles = require("../Model/Roles.Model");
db.categories = require("../Model/Categories.Model");
db.courses = require("../Model/Courses.Model");
db.programmings = require("../Model/Programming.Model");
db.realatedCourses = require("../Model/RelatedCourses.Model");
db.traineeInfo = require("../Model/TraineeInfo.Mode");
db.trainerInfo = require("../Model/TrainerInfo.Model");
db.trainerTypes = require("../Model/TrainerTypes.Model");

const User = db.users;
const Roles = db.roles;
const Types = db.trainerTypes;
const Programming = db.programmings;
const Category = db.categories;
const Course = db.courses;

//initailize data snippet
db.initialize = async () => {
  try {
    //create 4 roles
    let countRole = await Roles.estimatedDocumentCount();
    if (countRole !== 0) {
      return;
    }
    let admin = await new Roles({ name: "admin" });
    await admin.save();
    let staff = await new Roles({ name: "staff" });
    await staff.save();
    let trainer = await new Roles({ name: "trainer" });
    await trainer.save();
    let trainee = await new Roles({ name: "trainee" });
    await trainee.save();
    //create 2 types
    let countType = await Types.estimatedDocumentCount();
    if (countType !== 0) {
      return;
    }
    let internal = await new Types({ name: "Internal Type" });
    await internal.save();
    let external = await new Types({ name: "External Type" });
    await external.save();
    //create admin user
    let countUser = await User.estimatedDocumentCount();
    if (countUser !== 0) {
      return;
    }
    let adminUser = await new User({
      username: "admin",
      password: "admin",
      name: "Mai Xuan Nghia",
      roleId: await Roles.findOne({ name: "admin" }),
    });
    await adminUser.save();
    //create some categories
    let couteCate = await Category.estimatedDocumentCount();
    if (couteCate !== 0) {
      return;
    }
    let cate1 = await new Category({
      name: "Beginner",
      description:
        "This category use for saving book that are using for training internship and fresher",
    });
    await cate1.save();
    let cate2 = await new Category({
      name: "Data Structure & Algorithm",
      description:
        "This category use for saving book that are related to Data structure and Algorithm",
    });
    await cate2.save();
    let cate3 = await new Category({
      name: "Programming Language",
      description:
        "This category use for saving book that are using for learning programming language",
    });
    await cate3.save();
    //created some course
    let couteCourse = await Course.estimatedDocumentCount();
    if (couteCourse !== 0) {
      return;
    }
    let course1 = await new Course({
      name: "C# introduction",
      description:
        "This course contains all information, documentation and a guidline for learning C# programming language",
      categoryId: await Category.findOne({ name: "Programming Language" }),
    });
    await course1.save();
    let course2 = await new Course({
      name: "Node.JS training material",
      description:
        "This course contains all information, documentation and a guidline for learning Node.JS programming language",
      categoryId: await Category.findOne({ name: "Beginner" }),
    });
    await course2.save();
    let course3 = await new Course({
      name: "Data Structure Intrudction",
      description:
        "This course introduce an overview about data structure and algorithm",
      categoryId: await Category.findOne({
        name: "Data Structure & Algorithm",
      }),
    });
    await course3.save();
    //create  programming languages
    let countLang = await Programming.estimatedDocumentCount();
    if (countLang !== 0) {
      return;
    }
    let node = await new Programming({ name: "Node.JS" });
    await node.save();
    let cSharp = await new Programming({ name: "C# ASP.NET" });
    await cSharp.save();
    let python = await new Programming({ name: "python" });
    await python.save();
    return;
  } catch (error) {
    console.log({ mesage: "error occur" + error });
  }
};

module.exports = db;
