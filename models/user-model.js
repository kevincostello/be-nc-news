const db = require("../db/connection");

exports.selectUser = user => {
  console.log("im in the models - user:", user);
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
