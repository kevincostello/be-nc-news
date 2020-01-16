const {
  selectArticles,
  patchArticles,
  postArticleWithComment,
  selectCommentsByArticleId
} = require("../models/article-model.js");

const sendArticles = (req, res, next) => {
  console.log("In controller");
  selectArticles(req.params)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(err => {
      next(err);
    });
};

const sendArticlesToBePatched = (req, res, next) => {
  console.log("In controller");
  patchArticles(req.body, req.params)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(err => {
      next(err);
    });
};

const sendArticlesWithComment = (req, res, next) => {
  console.log("In controller comment");
  postArticleWithComment(req.body, req.params)
    .then(newComment => {
      res
        .status(201)
        .send({ newComment, msg: "Your comment was posted on the article" });
    })
    .catch(err => {
      next(err);
    });
};

const sendCommentsByArticleId = (req, res, next) => {
  console.log("In controller get comments by article id");
  selectCommentsByArticleId();
};

module.exports = {
  sendArticles,
  sendArticlesToBePatched,
  sendArticlesWithComment,
  sendCommentsByArticleId
};
