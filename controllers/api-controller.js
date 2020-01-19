const { selectAPIendpoints } = require("../models/api-model");

const allAPIendpoints = (req, res, next) => {
  console.log("In API controller");
  selectAPIendpoints().then(console.log("In here"));
};

module.exports = { allAPIendpoints };
