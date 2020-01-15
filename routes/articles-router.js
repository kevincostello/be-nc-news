const articlesRouter = require("express").Router();
const { sendArticles } = require("../controllers/article-controller");

console.log("articlesRouter");

articlesRouter.route("/:article_id").get(sendArticles);

module.exports = articlesRouter;
