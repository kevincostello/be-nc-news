const db = require("../db/connection");

const patchComment = (param, body) => {
  // function to check if body exists, return Promise.reject() if it doesn't
  const bodyVotesExists = () => {
    if (body.inc_votes === undefined && Object.keys(body).length > 0) {
      return Promise.reject({
        status: 400,
        msg: "Required keys are not supplied in PATCH"
      });
    }
    return Promise.resolve(); // if body exists this will be passed onto the then
  };

  return bodyVotesExists()
    .then(runQuery => {
      return db
        .select("*")
        .from("comments")
        .where("comment_id", param.comment_id)
        .increment("votes", body.inc_votes || 0)
        .returning("*");
    })
    .then(result => {
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "The comment id is not in the database"
        });
      } else return result[0];
    });
};

const deleteComment = param => {
  return db
    .from("comments")
    .where("comment_id", param.comment_id)
    .delete()
    .then(result => {
      if (result > 0) {
        return result;
      } else if (result === 0) {
        return Promise.reject({
          status: 404,
          msg: "The comment_id does not exist"
        });
      }
    });
};

module.exports = {
  patchComment,
  deleteComment
};
