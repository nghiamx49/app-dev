const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const PORT = 4000 || process.env.PORT;
const index = require("./Route/index");

app.use("/", index);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`sever up and run on ${PORT}`);
});
