const apiRouter = require("express").Router();
const topicsRouter = require("./topics-router");
const usersRouter = require("./users-router.js");
const articlesRouter = require("./articles-router");
const commentsRouter = require("./comments-router");

const { allAPIendpoints } = require("../controllers/api-controller");

const { send405Error } = require("../errors/index");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter
  .route("/")
  // .get(allAPIendpoints)
  .all(send405Error);

module.exports = apiRouter;
