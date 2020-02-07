const usersRouter = require("express").Router();
const {
  sendUser,
  sendNewUser,
  sendAllUsers
} = require("../controllers/user-controller");
const { send405Error } = require("../errors/index");

console.log("usersRouter");

usersRouter
  .route("/:username")
  .get(sendUser)
  .all(send405Error);
usersRouter
  .route("/")
  .get(sendAllUsers)
  .post(sendNewUser)
  .all(send405Error);

module.exports = usersRouter;
