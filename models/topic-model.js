const db = require("../db/connection");

exports.selectTopics = () => {
  console.log("im in the models");
  return db.select("*").from("topics");
};
