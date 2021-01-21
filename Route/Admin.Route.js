const express = require("express");
const adminRoute = express();
const adminController = require("../Controller/admin/Admin.Controller");

adminRoute.use("/", adminController);

module.exports = adminRoute;
