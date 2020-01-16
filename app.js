const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");

app.use(express.json());
app.use("/api", apiRouter);
app.use("/*", (req, res, next) => {
  console.log("in 3 parameter 404 error log");
  // res.status(404).send({ status: 404, msg: "Path is misspelt" });
  res.status(404).send({ status: 404, msg: "Path is misspelt" });
});

app.use(function(err, req, res, next) {
  console.log("In 4 parameter error handler");
  if (err.code === "22P02") {
    if (req.body.hasOwnProperty("inc_votes")) {
      res
        .status(400)
        .send({ msg: "An invalid value for inc_votes was entered" });
    } else res.status(400).send({ msg: "Invalid article ID" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "The article id is not in the database" });
  } else res.status(404).send(err);
});

module.exports = app;
