const articlesRouter = require("express").Router();
const {
  sendArticles,
  sendArticlesToBePatched,
  sendArticlesWithComment
} = require("../controllers/article-controller");

console.log("articlesRouter");

articlesRouter
  .route("/:article_id")
  .get(sendArticles)
  .patch(sendArticlesToBePatched);

articlesRouter.route("/:article_id/comments").post(sendArticlesWithComment);

module.exports = articlesRouter;
