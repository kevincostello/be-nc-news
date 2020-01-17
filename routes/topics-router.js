const topicsRouter = require("express").Router();
const { sendTopics } = require("../controllers/topic-controller");

const { send405Error } = require("../errors/index.js");

console.log("topicsRouter");

topicsRouter
  .route("/")
  .get(sendTopics)
  .all(send405Error);

module.exports = topicsRouter;
