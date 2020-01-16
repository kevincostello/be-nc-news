const db = require("../db/connection");

exports.selectArticles = article => {
  console.log("im in the models");
  return db
    .select("articles.*")
    .from("articles")
    .count("comments.comment_id as comment_count")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .where("articles.article_id", article.article_id)
    .groupBy("articles.article_id")
    .then(result => {
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "The article id is not in the database"
        });
      } else {
        return result;
      }
    });
};

exports.patchArticles = (body, params) => {
  console.log("im in the models");
  return db
    .from("articles")
    .where("articles.article_id", params.article_id)
    .increment("votes", body.inc_votes || 0)
    .returning("*")
    .then(result => {
      console.log("patching result is completed");
      return result;
    });
  // need to use selectArticles model to return the updated article, how can I do this?
};

exports.postArticleWithComment = (body, params) => {
  console.log("im in the models", body, params);
  // need to create a comment id
  // need to create votes with default value
  // need to create created at value
};
