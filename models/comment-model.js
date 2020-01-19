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
      console.log(result);
      return result[0];
    });
};

exports.deleteComment = param => {
  console.log("In delete comment model", param);
  return db
    .from("comments")
    .where("comment_id", param.comment_id)
    .delete()
    .then(result => {
      if (result > 0) {
        console.log(
          result,
          "row was deleted from the comments table for ",
          param
        );
        return result;
      } else if (result === 0) {
        console.log("result", result);
        return Promise.reject({
          status: 404,
          msg: "The comment_id does not exist"
        });
      }
    });
};
