const { selectUser } = require("../models/user-model.js");

const sendUser = (req, res, next) => {
  console.log(req.params);
  console.log("In controller");
  selectUser(req.params)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

module.exports = { sendUser };
