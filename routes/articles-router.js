const articlesRouter = require("express").Router();
const {
  sendArticles,
  sendArticlesToBePatched
} = require("../controllers/article-controller");

console.log("articlesRouter");

articlesRouter.route("/:article_id").get(sendArticles);

articlesRouter.route("/").patch(sendArticlesToBePatched);

module.exports = articlesRouter;
