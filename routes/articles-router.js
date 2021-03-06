const articlesRouter = require("express").Router();
const {
  sendArticle,
  sendArticleToBePatched,
  sendArticleWithComment,
  sendCommentsByArticleId,
  sendAllArticles,
  sendArticleToBeRemoved,
  sendNewArticle
} = require("../controllers/article-controller");

const { send405Error } = require("../errors/index.js");

console.log("articlesRouter");

articlesRouter
  .route("/:article_id")
  .get(sendArticle)
  .patch(sendArticleToBePatched)
  .delete(sendArticleToBeRemoved)
  .all(send405Error);

articlesRouter
  .route("/:article_id/comments")
  .post(sendArticleWithComment)
  .get(sendCommentsByArticleId)
  .all(send405Error);

articlesRouter
  .route("/")
  .get(sendAllArticles)
  .post(sendNewArticle)
  .all(send405Error);

module.exports = articlesRouter;
