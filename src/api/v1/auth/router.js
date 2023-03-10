const authRouter = require("express").Router();
const authController = require("./controllers");

authRouter.post("/register", authController.signup);
authRouter.post("/login", authController.login);

module.exports = authRouter;
