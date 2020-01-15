const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");

app.use("/api", apiRouter);

app.use(function(err, req, res, next) {
  console.log(err, "In app error");
});

module.exports = app;
