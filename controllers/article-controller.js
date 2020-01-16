const {
  selectArticles,
  patchArticles,
  postArticleWithComment
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
  console.log("In controller comment", Object.keys(req), req.body, req.params);
  postArticleWithComment(req.body, req.params)
    .then(newComment => {
      res.status(201).send({ newComment });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = {
  sendArticles,
  sendArticlesToBePatched,
  sendArticlesWithComment
};
