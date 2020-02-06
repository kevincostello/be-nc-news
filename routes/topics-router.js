const topicsRouter = require("express").Router();
const { sendTopics, sendNewTopic } = require("../controllers/topic-controller");

const { send405Error } = require("../errors/index.js");

console.log("topicsRouter");

topicsRouter
  .route("/")
  .get(sendTopics)
  .post(sendNewTopic)
  .all(send405Error);

module.exports = topicsRouter;
