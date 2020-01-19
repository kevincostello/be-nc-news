const db = require("../db/connection");

const selectAPIendpoints = requests => {
  console.log("im in the models", requests, typeof requests);
  const jsonReturn = inParam => {
    return inParam;
  };
  return jsonReturn(requests).then(res => console.log(res));
  // return requests.then(res => res);
};

module.exports = { selectAPIendpoints };
