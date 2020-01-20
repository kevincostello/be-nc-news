const { patchComment, deleteComment } = require("../models/comment-model");

const sendCommentToBePatched = (req, res, next) => {
  console.log("In controller");
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
  console.log("In controller");
  deleteComment(req.params)
    .then(comment => {
      res.status(204).send();
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { sendCommentToBePatched, sendCommentToBeDeleted };
