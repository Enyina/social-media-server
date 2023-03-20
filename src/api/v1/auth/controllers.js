const authService = require("./service");
const { sendRes } = require("./.././.././../utils/sendRes");
const catchAsync = require("../../../utils/catchAsync");
const { log } = require("winston");

const authController = {
  signup: catchAsync(async (req, res) => {
    console.log(req.body);
    const { accessToken, refreshToken, newUser } = await authService.register(
      req
    );

    res.user = newUser;

    res.cookie("accessToken", accessToken, {
      maxage: 600000, // 10 minutes
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      maxage: 1000 * 60 * 60 * 24 * 60,
      httpOnly: true,
    });

    sendRes(res, 201, { accessToken, refreshToken, newUser });
  }),
  login: catchAsync(async (req, res) => {
    console.log(req.body);
    const { accessToken, refreshToken, user } = await authService.login(req);
    res.user = user;
    res.cookie("accessToken", accessToken, {
      maxage: 600000, // 10 minutes
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      maxage: 1000 * 60 * 60 * 24 * 60,
      httpOnly: true,
    });

    sendRes(res, 200, { accessToken, refreshToken, user });
  }),
};

module.exports = authController;
