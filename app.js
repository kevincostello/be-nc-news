const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");

app.use(express.json());
app.use("/api", apiRouter);
app.use("/*", (req, res, next) => {
  console.log("in 404 error log");
  res.status(404).send();
});

// app.all("/*", (req, res, next) => {
//   console.log("req", Object.keys(req), "res", res);
//   return res.status(404);
// });

app.use(function(err, req, res, next) {
  console.log(err, "In app error");
});

module.exports = app;
