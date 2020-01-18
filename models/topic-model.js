const db = require("../db/connection");

exports.selectTopics = () => {
  console.log("im in the models");
  return db.select("*").from("topics");
};

// I need to write a couple of tests for this
// I am using this to test the /api/articles endpoint
exports.selectTopic = topic => {
  console.log("im in the models");
  return db
    .select("*")
    .from("topics")
    .where("slug", topic)
    .then(result => {
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "The query value is not on the database"
        });
      } else {
        return result;
      }
    });
};
