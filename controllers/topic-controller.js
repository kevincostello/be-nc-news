const { selectTopics, insertNewTopic } = require("../models/topic-model.js");

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

const sendNewTopic = (req, res, next) => {
  console.log("In controller");
  insertNewTopic(req.body).then(topic => {
    res.status(201).send({ topic });
  });
};

module.exports = { sendTopics, sendNewTopic };
