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
        console.log(result, "<<<<<<<< This is the empty array error");
        return result;
        // return Promise.reject({
        //   status: 404,
        //   msg: "The username does not exist"
        // });
      } else {
        return result;
      }
    })
    .then(result2 => {
      // console.log("The length of the original result is", result.length);
      console.log("This result is:", result2);
      return result2;
    });
  // .then(result => {
  //   if (result.length === 0) {
  //     console.log(result, "<<<<<<<< This is the empty array error");
  //     return Promise.reject({
  //       status: 404,
  //       msg: "The username does not exist"
  //     });
  //   } else {
  //     return result;
  //   }
  // });
};
