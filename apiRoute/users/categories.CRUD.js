const express = require("express");
const categoryCRUD = express.Router({ mergeParams: true });
const db = require("../../Migrations/db.Connection");
const passport = require("passport");
const passportConf = require("../../Middleware/Auth.Middleware");
const Category = db.categories;
const checkRole = require("../../Middleware/checkRole.Middleware");

//allow only staff have permission in this route
categoryCRUD.use(checkRole.isStaff);
//get all categories
categoryCRUD.get("/", async (req, res, next) => {
  try {
    let categories = await Category.find({});
    if (!categories.length) {
      res
        .status(201)
        .json({ message: { mesBody: "Categories found" }, mesError: true });
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
    let category = await new Category({
      name,
      description,
    });
    await category.save();
    res.status(200).json({
      mesBody: { mesBody: "Create new category successfully" },
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
    if (!category) {
      res
        .status(201)
        .json({ message: { mesBody: "Category not found" }, mesError: true });
    }
    const { _id, name, description } = category;
    req.category = {
      _id,
      name,
      description,
    };
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Errors" }, mesError: true });
    next(error);
  }
});

categoryCRUD.get("/detail/:categoryId", (req, res, next) => {
  res.status(200).json({ message: { cateogy: req.category }, mesError: false });
});

categoryCRUD.put("/edit/:categoryId", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const { _id } = req.categories;
    let category = await Category.findById(_id);
    category.name = name;
    category.description = description;
    await category.save();
    res.status(200).json({
      mesBody: { mesBody: "Update category successfully" },
      mesError: false,
    });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});

//delete category
categoryCRUD.delete("/delete/:courseId", async (req, res, next) => {
  try {
    const { _id } = req.category;
    await Category.deleteOne({ _id });
    res.status(200).json({
      mesBody: { mesBody: "Delete category successfully" },
      mesError: false,
    });
  } catch (error) {
    res.status(500).json({ message: { mesBody: "Error" }, mesError: true });
    next(error);
  }
});

module.exports = categoryCRUD;
