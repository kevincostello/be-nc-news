const db = require("../db/connection");

exports.selectArticles = article => {
  console.log("im in the models", article);
  return db
    .select("articles.*")
    .from("articles")
    .count("comments.comment_id")
    .join("comments", "articles.article_id", "=", "comments.article_id")
    .where("articles.article_id", article.article_id)
    .groupBy("articles.article_id")
    .then(result => {
      if (result.length === 0) {
        console.log(result, "<<<<<<<< This is the empty array error");
        return Promise.reject({
          status: 404,
          msg: "The article id is not in the database"
        });
      } else {
        return result;
      }
    });
};

// .modify(query => {
//   if (article) {
//     console.log("query is this:", article);
//     query
//       .where("articles.article_id", article.article_id)
//       .join("comments", "articles.article.id", "=", "comments.article_id")
//       .groupBy("articles.article_id");
//   }
// })
