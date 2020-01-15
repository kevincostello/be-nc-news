const db = require("../db/connection");

exports.selectArticles = article => {
  console.log("im in the models", article);
  return db
    .select("*")
    .from("articles")
    .modify(query => {
      if (article) {
        query.where("article_id", article.article_id);
      }
    })
    .then(result => {
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "The username does not exist"
        });
      } else {
        return result;
      }
    });
};
