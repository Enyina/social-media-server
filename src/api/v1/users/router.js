const userController = require("./controller");
const friendRouter = require("../friends");

const userRouter = require("express").Router();

userRouter
  .route("/:userId")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .patch(userController.deleteUser);

userRouter.use("/friends", friendRouter);

module.exports = userRouter;
