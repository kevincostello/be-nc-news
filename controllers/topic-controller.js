const { selectTopics, insertNewTopic } = require("../models/topic-model.js");

const sendTopics = (req, res, next) => {
  selectTopics()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(err => {
      next(err);
    });
};

const sendNewTopic = (req, res, next) => {
  insertNewTopic(req.body)
    .then(topic => {
      res.status(201).send({ topic });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { sendTopics, sendNewTopic };
