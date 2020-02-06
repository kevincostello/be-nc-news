const db = require("../db/connection");

exports.selectUser = user => {
  console.log("im in the models - user");
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
  console.log("im in the models - insert new user");
  return db
    .from("users")
    .insert(body)
    .returning("*")
    .then(result => {
      return result[0];
    });
};

exports.selectAllUsers = () => {
  console.log("im in the models - select all users");
  return db
    .select("*")
    .from("users")
    .then(result => {
      console.log("the users are: ", result);
      return result;
    });
};
