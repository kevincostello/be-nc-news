const articlesRouter = require("express").Router();
const {
  sendArticles,
  sendArticlesToBePatched
} = require("../controllers/article-controller");

console.log("articlesRouter");

articlesRouter.route("/:article_id").get(sendArticles);
// .patch(sendArticlesToBePatched)

articlesRouter
  .route("/:article_id/:new_votes", function(req, res) {
    const body = {
      inc_votes: req.params.new_votes,
      article_id: req.params.article_id
    };
  })
  .patch(sendArticlesToBePatched);

module.exports = articlesRouter;
