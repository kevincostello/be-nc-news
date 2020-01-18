const usersRouter = require("express").Router();
const { sendUser } = require("../controllers/user-controller");

console.log("usersRouter");

usersRouter.route("/:username").get(sendUser);

usersRouter.route("/").get(sendUser);

module.exports = usersRouter;
