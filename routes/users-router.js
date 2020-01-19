const usersRouter = require("express").Router();
const { sendUser } = require("../controllers/user-controller");
const { send405Error } = require("../errors/index");

console.log("usersRouter");

usersRouter
  .route("/:username")
  .get(sendUser)
  .all(send405Error);
usersRouter
  .route("/")
  .get(sendUser)
  .all(send405Error);

module.exports = usersRouter;
