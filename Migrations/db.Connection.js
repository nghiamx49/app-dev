const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.users = require("../Model/Users.Model");
db.roles = require("../Model/Roles.Model");
db.categories = require("../Model/Categories.Model");
db.courses = require("../Model/Courses.Model");
db.programmings = require("../Model/Programming.Model");
db.relatedCourses = require("../Model/RelatedCourses.Model");
db.traineeInfo = require("../Model/TraineeInfo.Mode");
db.trainerInfo = require("../Model/TrainerInfo.Model");
db.trainerTypes = require("../Model/TrainerTypes.Model");
db.request = require("../Model/Request.Model");

const User = db.users;
const Roles = db.roles;
const Types = db.trainerTypes;
const Programming = db.programmings;
const Category = db.categories;
const Course = db.courses;
const TrainerInfo = db.trainerInfo;
const TraineeInfo = db.traineeInfo;
const RelatedCourses = db.relatedCourses;

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
    let countTrainerInfo = await TrainerInfo.estimatedDocumentCount();
    if (countTrainerInfo !== 0) {
      return;
    }
    let trainerInfo = await new TrainerInfo({
      workingPlace: "FPT Co",
      phoneNumber: "0977813551",
      email: "trainer@trainer.com",
      typeId: await Types.find({ name: "Internal Type" }),
    });
    await trainerInfo.save();
    let countTraineeInfo = await TraineeInfo.estimatedDocumentCount();
    if (countTraineeInfo !== 0) {
      return;
    }
    let traineeInfo = await new TraineeInfo({
      dateOfBirth: "2000-09-04",
      age: "18",
      email: "trainee@trainee.com",
      education: "Greenwich University",
      programmingId: await Programming.find({ name: "Node.JS" }),
      TOEICScore: "650",
      experienceDetails: "no experience, intership programming",
      department: "Intership developer",
    });
    await traineeInfo.save();
    //create some user
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
    //staff
    let staffUser = await new User({
      username: "staff",
      password: "staff",
      name: "Mai Xuan Nghia",
      roleId: await Roles.findOne({ name: "staff" }),
    });
    await staffUser.save();
    //trainer
    let trainerUser = await new User({
      username: "trainer",
      password: "trainer",
      name: "Mai Xuan Nghia",
      roleId: await Roles.findOne({ name: "trainer" }),
      trainerInfoId: trainerInfo,
    });
    await trainerUser.save();
    //trainee
    let traineeUser = await new User({
      username: "trainee",
      password: "trainee",
      name: "Mai Xuan Nghia",
      roleId: await Roles.findOne({ name: "trainee" }),
      traineeInfoId: traineeInfo,
    });
    await traineeUser.save();
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
      name: "C# Introduction",
      description:
        "This course contains all information, documentation and a guidline for learning C# programming language",
      categoryId: await Category.findOne({ name: "Programming Language" }),
    });
    await course1.save();
    let course2 = await new Course({
      name: "Node.JS Training Material",
      description:
        "This course contains all information, documentation and a guidline for learning Node.JS programming language",
      categoryId: await Category.findOne({ name: "Beginner" }),
    });
    await course2.save();
    let course3 = await new Course({
      name: "Data Structure Introduction",
      description:
        "This course introduce an overview about data structure and algorithm",
      categoryId: await Category.findOne({
        name: "Data Structure & Algorithm",
      }),
    });
    await course3.save();
    //create related courses
    let relatedCourse = await RelatedCourses.estimatedDocumentCount();
    if (relatedCourse !== 0) {
      return;
    }
    let relatedCourse1 = await new RelatedCourses({
      courseId: course1,
      userId: traineeUser,
    });
    await relatedCourse1.save();
    let relatedCourse2 = await new RelatedCourses({
      courseId: course2,
      userId: trainerUser,
    });
    await relatedCourse2.save();
    return;
  } catch (error) {
    console.log({ mesage: "error occur" + error });
  }
};

module.exports = db;
