const express = require("express");
const trainerCURD = express.Router({ mergeParams: true });

//get all trainer in the system
trainerCURD.get("/", (req, res, next) => {});

trainerCURD.param("userId", (req, res, next) => {});

trainerCURD.get("/detail/:userId", (req, res, next) => {});

trainerCURD.post("/create", (req, res, next) => {});

trainerCURD.put("/edit/:userId", (req, res, next) => {});

trainerCURD.delete("/delete/:userId", (req, res, next) => {});

module.exports = trainerCURD;
