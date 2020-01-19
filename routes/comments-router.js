const commentsRouter = require("express").Router();

const {
  sendCommentToBePatched,
  sendCommentToBeDeleted
} = require("../controllers/comment-controller");

const { send405Error } = require("../errors/index");

console.log("commentsRouter");

commentsRouter
  .route("/:comment_id")
  .patch(sendCommentToBePatched)
  .delete(sendCommentToBeDeleted)
  .all(send405Error);

module.exports = commentsRouter;
