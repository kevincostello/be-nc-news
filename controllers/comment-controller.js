const { patchComment } = require("../models/comment-model");

const sendCommentToBePatched = (req, res, next) => {
  console.log("In controller", req.params);
  patchComment(req.params)
    .then(comment => {
      console.log("Results from query in controller", comment);
      res.status(200).send();
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { sendCommentToBePatched };
