const db = require("../db/connection");

exports.selectTopics = () => {
  return db.select("*").from("topics");
};

exports.insertNewTopic = body => {
  return db
    .from("topics")
    .insert(body)
    .returning("*")
    .then(result => {
      return result[0];
    });
};
