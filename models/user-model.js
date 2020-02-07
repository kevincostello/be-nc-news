const db = require("../db/connection");

exports.selectUser = user => {
  return db
    .select("*")
    .from("users")
    .where("username", user.username)
    .then(result => {
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "The username does not exist"
        });
      } else {
        return result[0];
      }
    });
};

exports.insertNewUser = body => {
  return db
    .from("users")
    .insert(body)
    .returning("*")
    .then(result => {
      return result[0];
    });
};

exports.selectAllUsers = () => {
  return db
    .select("*")
    .from("users")
    .then(result => {
      return result;
    });
};
