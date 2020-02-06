const {
  selectUser,
  insertNewUser,
  selectAllUsers
} = require("../models/user-model.js");

const sendUser = (req, res, next) => {
  console.log("In controller");
  selectUser(req.params)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(err => {
      next(err);
    });
};

const sendNewUser = (req, res, next) => {
  console.log("In controller", req.body);
  insertNewUser(req.body)
    .then(user => {
      res.status(201).send({ user });
    })
    .catch(err => {
      next(err);
    });
};

const sendAllUsers = (req, res, next) => {
  console.log("In controller");
  selectAllUsers()
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { sendUser, sendNewUser, sendAllUsers };
