const { selectAPIendpoints } = require("../models/api-model");

const allAPIendpoints = (req, res, next) => {
  console.log("In API controller", req.body);
  const stringy = JSON.stringify(req.body);
  res.status(200).send(req.body);
};

module.exports = { allAPIendpoints };
