const { selectArticles } = require("../models/article-model.js");

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

module.exports = { sendArticles };
