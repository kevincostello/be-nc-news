const { selectAPIendpoints } = require("../models/api-model");

const allAPIendpoints = (req, res, next) => {
  res.status(200).send(req.body);
};

module.exports = { allAPIendpoints };
