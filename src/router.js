const userRoute = require("./api/v1/users");
const authRoute = require("./api/v1/auth");
const postRoute = require("./api/v1/posts");
const { Router } = require("express");

const v1Router = Router();

v1Router.use("/auth", authRoute);
v1Router.use("/users", userRoute);
v1Router.use("/posts", postRoute);

module.exports = v1Router;
