const express = require("express");
const trainerApi = express.Router();

trainerApi.get("/courses", (req, res, next) => {});

module.exports = trainerApi;
