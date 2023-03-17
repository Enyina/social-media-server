const userRoute = require("./api/v1/users");
const authRoute = require("./api/v1/auth");
const postRoute = require("./api/v1/posts");
const { Router } = require("express");
const authMiddleware = require("./middleware/auth");
const { request } = require("./app");

const v1Router = Router();
console.log(request);

v1Router.use("/auth", authRoute);
v1Router.use("/users", authMiddleware.isAuthenticated, userRoute);
v1Router.use("/posts", authMiddleware.isAuthenticated, postRoute);

module.exports = v1Router;
