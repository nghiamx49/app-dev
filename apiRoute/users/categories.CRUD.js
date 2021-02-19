const express = require("express");
const categoryCRUD = express.Router({ mergeParams: true });
const db = require("../../Migrations/db.Connection");
const passport = require("passport");
const passportConf = require("../../Middleware/Auth.Middleware");
const Category = db.categories;
const Course = db.courses;
const RelatedCourses = db.relatedCourses;
const checkRole = require("../../Middleware/checkRole.Middleware");

//allow only staff have permission in this route
//get all categories
categoryCRUD.get("/", async (req, res, next) => {
  try {
    let categories = await Category.find({});
    if (!categories) {
      res
        .status(404)
        .json({ message: { mesBody: "Categories not found" }, mesError: true });
      next(error);
    }
    //using promise all to resolve all promise that the array.prototype.map function retrun
    res
      .status(200)
      .json({ message: { categories: categories }, mesError: false });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});
//create new category
categoryCRUD.post("/create", checkRole.isStaff, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    let checkIfExist = await Category.find({ name: name });
    if (checkIfExist) {
      res.status(400).json({
        message: { mesBody: "This category is already exists" },
        mesError: true,
      });
    }
    let category = await new Category({
      name,
      description,
    });
    await category.save();
    res.status(200).json({
      message: { mesBody: "Create new category successfully" },
      mesError: false,
    });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});

//find category by id an return object contains category detail
categoryCRUD.param("categoryId", async (req, res, next, categoryId) => {
  try {
    let category = await Category.findById(categoryId);
    console.log(category);
    if (!category) {
      res
        .status(404)
        .json({ message: { mesBody: "Category not found" }, mesError: true });
    }
    const { _id, name, description } = category;
    req.category = {
      _id,
      name,
      description,
    };
    next();
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Errors" }, mesError: true });
    next(error);
  }
});

categoryCRUD.get(
  "/detail/:categoryId",
  checkRole.isStaff,
  async (req, res, next) => {
    res
      .status(200)
      .json({ message: { category: req.category }, mesError: false });
  }
);

categoryCRUD.put(
  "/edit/:categoryId",
  checkRole.isStaff,
  async (req, res, next) => {
    try {
      const { name, description } = req.body;
      let checkIfExist = await Category.find({ name: name });
      if (checkIfExist) {
        res.status(400).json({
          message: { mesBody: "This category is already exists" },
          mesError: true,
        });
      }
      const { _id } = req.category;
      let category = await Category.findById(_id);
      category.name = name;
      category.description = description;
      await category.save();
      res.status(200).json({
        message: { mesBody: "Update category successfully" },
        mesError: false,
      });
    } catch (error) {
      res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
      next(error);
    }
  }
);

//delete category
categoryCRUD.delete(
  "/delete/:categoryId",
  checkRole.isStaff,
  async (req, res, next) => {
    try {
      const { _id } = req.category;
      let allCourses = await Course.find({ categoryId: _id });
      await Promise.all(
        allCourses.map(async (course) => {
          await RelatedCourses.deleteMany({ courseId: course._id });
        })
      );
      await Course.deleteMany({ categoryId: _id });
      await Category.deleteOne({ _id });
      res.status(200).json({
        message: { mesBody: "Delete category successfully" },
        mesError: false,
      });
    } catch (error) {
      res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
      next(error);
    }
  }
);

module.exports = categoryCRUD;
