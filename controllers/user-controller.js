const { selectUsers } = require("../models/user-model.js");

const sendUsers = (req, res, next) => {
  console.log(req.params);
  console.log("In controller");
  selectUsers(req.params)
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

module.exports = { sendUsers };
