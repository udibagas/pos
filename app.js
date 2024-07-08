require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require("./routes"));

app.use(function (err, req, res, next) {
  const { status, message, errors } = err;
  res.status(status || 500);
  return res.json({ message, errors });
});

module.exports = app;
