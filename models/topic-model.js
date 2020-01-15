const db = require("../db/connection");

exports.selectTopics = () => {
  console.log("im in the models");
  return db.select("*").from("topics");
};

// exports.selectTopics = query => {
//   console.log("im in the models", query);
//   return db.select("*").from("topics");
// };
