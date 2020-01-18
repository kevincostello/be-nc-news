const db = require("../db/connection");

exports.patchComment = param => {
  console.log("im in the models");
  return db
    .select("*")
    .from("comments")
    .where("comment_id", param.comment_id)
    .then(result => {
      console.log(result);
      return result;
    });
};
