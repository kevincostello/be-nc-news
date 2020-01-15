const topicsRouter = require("express").Router();
const { sendTopics } = require("../controllers/topic-controller");

console.log("topicsRouter");

topicsRouter.route("/").get(sendTopics);

module.exports = topicsRouter;
