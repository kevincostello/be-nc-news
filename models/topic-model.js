const db = require("../db/connection");

exports.selectTopics = () => {
  console.log("im in the models");
  return db.select("*").from("topics");
};

exports.insertNewTopic = body => {
  console.log("im in the models");
  return db
    .from("topics")
    .insert(body)
    .returning("*")
    .then(result => {
      console.log("the result is: ", result);
      return result[0];
    });
};
