const {
  selectArticle,
  patchArticles,
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
  selectCommentsByArticleId(req.params, req.query)
    .then(allComments => {
      res.status(200).send(allComments);
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
  sendArticlesToBePatched,
  sendArticlesWithComment,
  sendCommentsByArticleId,
  sendAllArticles
};
