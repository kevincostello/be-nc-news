exports.send405Error = (req, res, next) => {
  console.log("In 405 error handler");
  res.status(405).send({ msg: "method not allowed" });
};
