const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");

app.use(express.json());
app.use("/api", apiRouter);
app.use("/*", (req, res, next) => {
  console.log("in 404 error log");
  // res.status(404).send({ status: 404, msg: "Path is misspelt" });
  res.status(404).send({ status: 404, msg: "Path is misspelt" });
});

app.use(function(err, req, res, next) {
  console.log("error is", err);
  res.status(404).send(err);
});

module.exports = app;
