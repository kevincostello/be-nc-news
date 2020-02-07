const {
  selectUser,
  insertNewUser,
  selectAllUsers
} = require("../models/user-model.js");

const sendUser = (req, res, next) => {
  selectUser(req.params)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(err => {
      next(err);
    });
};

const sendNewUser = (req, res, next) => {
  insertNewUser(req.body)
    .then(user => {
      res.status(201).send({ user });
    })
    .catch(err => {
      next(err);
    });
};

const sendAllUsers = (req, res, next) => {
  selectAllUsers()
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { sendUser, sendNewUser, sendAllUsers };
