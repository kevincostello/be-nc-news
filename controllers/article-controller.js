const { selectArticles, patchArticles } = require("../models/article-model.js");

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
  patchArticles(req.body)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { sendArticles, sendArticlesToBePatched };
