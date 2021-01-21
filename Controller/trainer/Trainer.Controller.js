const express = require("express");
const trainerController = express.Router();

trainerController.get("/courses", (req, res, next) => {});

module.exports = trainerController;
