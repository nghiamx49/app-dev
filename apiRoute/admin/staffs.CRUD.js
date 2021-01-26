const express = require("express");
const staffCRUD = express.Router({ mergeParams: true });

//get all staff in the system
staffCRUD.get("/", (req, res) => {
  res.send("hello");
});


staffCRUD.param("userId", (req, res, next) => {});

staffCRUD.get("/detail/:userId", (req, res, next) => {});

staffCRUD.post("/create", (req, res, next) => {});

staffCRUD.put("/edit/:userId", (req, res, next) => {});

staffCRUD.delete("/delete/:userId", (req, res, next) => {});

module.exports = staffCRUD;
