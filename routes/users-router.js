const usersRouter = require("express").Router();
const { sendUsers } = require("../controllers/user-controller");

console.log("usersRouter");

usersRouter.route("/:username").get(sendUsers);

module.exports = usersRouter;
