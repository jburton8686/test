"use strict";

var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
/* Remove the following line for use with Heroku and set up your Heroku environment variables accordingly. */
require("dotenv").config();

//routes:
var index = require("./routes/index");
var users = require("./routes/users");
var bars = require("./routes/bars");

// models:
require("./models/bar");
require("./models/user");
require("./models/admin");

var app = express();

// database setup:
const db = mongoose.connection;
mongoose.connect(process.env.DATABASE_URI);
db.on(
  "error",
  console.error.bind(console, "Cannot connect to the database instance.")
);
db.once("open", function() {
  console.log(`Database connected via ${process.env.DATABASE_URI}`);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// router.route('/user')

//   .post(function (req, res) {

//     var user = new User();
//     user.name = req.body.name;

//     user.save(function (err) {
//       if (err)
//         res.send(err);

//       res.json({ message: 'User created!' });
//     });

//   });
// app.get("/setup", function (req, res) {
//   // create a sample user
//   var user = new User({
//     name: "Bob Jones",
//     password: "password",
//     admin: false
//   });
//   // save the sample user
//   user.save(function (err) {
//     if (err) throw err;
//     console.log("User saved successfully");
//     res.json({ success: true });
//   });
// });

app.use("/", index);
app.use("/users", users);
app.use("/bars", bars);
app.use("/admin", bars);

app.get("/", function(req, res, next) {
  // Handle the get for this route
});

app.post("/", function(req, res, next) {
  // Handle the post for this route
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
