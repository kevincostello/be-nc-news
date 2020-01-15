const db = require("../db/connection");

exports.selectUsers = user => {
  console.log("im in the models", user);
  return db
    .select("*")
    .from("users")
    .modify(query => {
      console.log("This is the query", user);
      if (user) {
        query.where("username", user.username);
      }
    })

    .then(result => {
      console.log(user);
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "The username does not exist"
        });
      } else {
        return result;
      }
    });
};
