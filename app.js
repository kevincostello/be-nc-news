const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");
const { send405Error } = require("./errors/index");

app.use(express.json());
app.get("/", function(req, res, next) {
  res.send("Welcome to my wonderful API!");
});

app.use("/api", apiRouter);
app.use("/*", (req, res, next) => {
  res.status(404).send({ status: 404, msg: "Path is misspelt" });
});

app.use(function(err, req, res, next) {
  if (err.code === "22P02") {
    if (req.body.hasOwnProperty("inc_votes")) {
      res
        .status(400)
        .send({ msg: "An invalid value for inc_votes was entered" });
    } else if (req.route.path === "/:comment_id") {
      res.status(400).send({ msg: "An invalid comment_id was passed" });
    } else res.status(400).send({ msg: "Invalid article ID" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "The article id is not in the database" });
  } else if (err.code === "42703") {
    res.status(400).send({ msg: "Invalid column for sort_by" });
  } else if (err.code === "23502") {
    res.status(400).send({ msg: "Required keys are not supplied in POST" });
  } else {
    res.status(err.status).send(err);
  }
});

module.exports = app;
