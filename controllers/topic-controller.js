const { selectTopics } = require("../models/topic-model.js");

const sendTopics = (req, res, next) => {
  const query = req.query;
  console.log("controller", query);
  selectTopics(query)
    .then(topic => {
      res.status(200).send({ topic });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

module.exports = { sendTopics };
