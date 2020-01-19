const {
  selectArticle,
  patchArticle,
  postArticleWithComment,
  selectCommentsByArticleId,
  selectAllArticles
} = require("../models/article-model.js");

const sendArticle = (req, res, next) => {
  console.log("In controller");
  selectArticle(req.params)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

const sendArticleToBePatched = (req, res, next) => {
  console.log("In controller");
  patchArticle(req.body, req.params)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

const sendArticleWithComment = (req, res, next) => {
  console.log("In controller comment");
  postArticleWithComment(req.body, req.params)
    .then(comment => {
      res
        .status(201)
        .send({ comment, msg: "Your comment was posted on the article" });
    })
    .catch(err => {
      next(err);
    });
};

const sendCommentsByArticleId = (req, res, next) => {
  console.log("In controller get comments by article id");
  selectCommentsByArticleId(req.params, req.query)
    .then(comments => {
      console.log("comments:", comments);
      res.status(200).send({ comments });
    })
    .catch(err => {
      next(err);
    });
};

const sendAllArticles = (req, res, next) => {
  console.log("In sendAllArticles");
  selectAllArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = {
  sendArticle,
  sendArticleToBePatched,
  sendArticleWithComment,
  sendCommentsByArticleId,
  sendAllArticles
};
