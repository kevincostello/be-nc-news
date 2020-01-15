const { selectTopics } = require("../models/topic-model.js");

const sendTopics = (req, res, next) => {
  // const query = req.query;
  console.log("In controller");
  // selectTopics(query)
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
