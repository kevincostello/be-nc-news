const articlesRouter = require("express").Router();
const {
  sendArticle,
  sendArticleToBePatched,
  sendArticleWithComment,
  sendCommentsByArticleId,
  sendAllArticles
} = require("../controllers/article-controller");

const { send405Error } = require("../errors/index.js");

console.log("articlesRouter");

articlesRouter
  .route("/:article_id")
  .get(sendArticle)
  .patch(sendArticleToBePatched)
  .all(send405Error);

articlesRouter
  .route("/:article_id/comments")
  .post(sendArticleWithComment)
  .get(sendCommentsByArticleId)
  .all(send405Error);

articlesRouter
  .route("/")
  .get(sendAllArticles)
  .all(send405Error);

module.exports = articlesRouter;
