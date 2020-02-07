const {
  selectArticle,
  patchArticle,
  postArticleWithComment,
  selectCommentsByArticleId,
  selectAllArticles,
  deleteArticle,
  insertNewArticle
} = require("../models/article-model.js");

const sendArticle = (req, res, next) => {
  selectArticle(req.params)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

const sendArticleToBePatched = (req, res, next) => {
  patchArticle(req.body, req.params)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

const sendArticleWithComment = (req, res, next) => {
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
  selectCommentsByArticleId(req.params, req.query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(err => {
      next(err);
    });
};

const sendAllArticles = (req, res, next) => {
  selectAllArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(err => {
      next(err);
    });
};

const sendArticleToBeRemoved = (req, res, next) => {
  deleteArticle(req.params)
    .then(article => {
      res.status(204).send();
    })
    .catch(err => {
      next(err);
    });
};

const sendNewArticle = (req, res, next) => {
  insertNewArticle(req.body)
    .then(article => {
      res.status(201).send({ article });
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
  sendAllArticles,
  sendArticleToBeRemoved,
  sendNewArticle
};
