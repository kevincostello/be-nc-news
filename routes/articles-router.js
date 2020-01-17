const articlesRouter = require("express").Router();
const {
  sendArticles,
  sendArticlesToBePatched,
  sendArticlesWithComment,
  sendCommentsByArticleId,
  sendAllArticles
} = require("../controllers/article-controller");

const { send405Error } = require("../errors/index.js");

console.log("articlesRouter");

articlesRouter
  .route("/:article_id")
  .get(sendArticles)
  .patch(sendArticlesToBePatched)
  .all(send405Error);

articlesRouter
  .route("/:article_id/comments")
  .post(sendArticlesWithComment)
  .get(sendCommentsByArticleId)
  .all(send405Error);

articlesRouter
  .route("/")
  .get(sendAllArticles)
  .all(send405Error);

module.exports = articlesRouter;
