const commentsRouter = require("express").Router();

const { sendCommentToBePatched } = require("../controllers/comment-controller");

const { send405Error } = require("../errors/index");

console.log("commentsRouter");

commentsRouter
  .route("/:comment_id")
  .patch(sendCommentToBePatched)
  .all(send405Error);

module.exports = commentsRouter;
