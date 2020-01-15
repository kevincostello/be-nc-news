const db = require("../db/connection");

exports.selectUsers = user => {
  console.log("im in the models", user.username);
  return db
    .select("*")
    .from("users")
    .where("username", user.username)
    .then(result => {
      if (result.length === 0) {
        return Promise.reject({ status: 404 });
      } else {
        return result;
      }
    });
};
