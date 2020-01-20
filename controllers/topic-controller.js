const { selectTopics } = require("../models/topic-model.js");

const sendTopics = (req, res, next) => {
  console.log("In controller");
  selectTopics()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

module.exports = { sendTopics };
