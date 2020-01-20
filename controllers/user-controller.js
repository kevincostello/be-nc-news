const { selectUser } = require("../models/user-model.js");

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

module.exports = { sendUser };
