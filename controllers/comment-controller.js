const { patchComment, deleteComment } = require("../models/comment-model");

const sendCommentToBePatched = (req, res, next) => {
  patchComment(req.params, req.body)
    .then(comment => {
      res.status(200).send({
        comment,
        msg: "The comment was updated with the passed values"
      });
    })
    .catch(err => {
      next(err);
    });
};

const sendCommentToBeDeleted = (req, res, next) => {
  deleteComment(req.params)
    .then(comment => {
      res.status(204).send();
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { sendCommentToBePatched, sendCommentToBeDeleted };
