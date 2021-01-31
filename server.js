const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const errorHandler = require("errorhandler");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 5000 || process.env.PORT;
const adminRoute = require("./apiRoute/admin/Admin.Api");
const db = require("./Migrations/db.Connection");
const authRoute = require("./apiRoute/auth/auth");
const passport = require("passport");
const userRoute = require("./apiRoute/users/user.Api");
const userProfile = require("./apiRoute/users/user.Profile");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDoc = require("swagger-jsdoc");

// const option = {
//   swaggerDefinition: {
//     info: {
//       title: "Test Api with Swagger",
//       description: "test",
//       contact: {
//         name: "Mai Xuan Nghia",
//         servers: ["https://localhost:4000"],
//       },
//     },
//   },
//   apis: ["server.js"],
// };

// const swaggerDocument = swaggerDoc(option);
// app.use("/swagger-apis", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//connecting to databse and initial fake data
db.mongoose
  .connect(
    `mongodb+srv://mxnghia49:mxnghia49@cluster0.sih8g.mongodb.net/tam?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connect to databse success");
    //db.initialize();
  })
  .catch((err) => {
    console.log("error:" + err);
    process.exit();
  });

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(errorHandler());

//routing api
app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/profile", userProfile);
app.use("/home", userRoute);
app.listen(PORT, () => {
  console.log(`sever up and run on ${PORT}`);
});
// // Routes
// /**
//  * @swagger
//  * /admin/staff:
//  *  get:
//  *    description: Use to request all customers
//  *    responses:
//  *      '200':
//  *        description: A successful response
//  */
