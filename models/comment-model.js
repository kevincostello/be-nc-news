const db = require("../db/connection");

exports.patchComment = (param, body) => {
  console.log("im in the models");
  return db
    .select("*")
    .from("comments")
    .where("comment_id", param.comment_id)
    .increment("votes", body.inc_votes || 0)
    .returning("*")
    .then(result => {
      return result;
    });
};
