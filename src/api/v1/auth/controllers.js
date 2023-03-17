const authService = require("./service");
const { sendRes } = require("./.././.././../utils/sendRes");
const catchAsync = require("../../../utils/catchAsync");
const { log } = require("winston");

const authController = {
  signup: catchAsync(async (req, res) => {
    console.log(req.body);
    const { accessToken, refreshToken } = await authService.register(req);
    console.log({ accessToken }, { refreshToken });

    res.cookie("accessToken", accessToken, {
      maxage: 600000, // 10 minutes
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      maxage: 1000 * 60 * 60 * 24 * 60,
      httpOnly: true,
    });

    sendRes(res, 201, { accessToken, refreshToken });
    console.log(sendRes(res, 201, { accessToken, refreshToken }));
  }),
  login: catchAsync(async (req, res) => {
    const { accessToken, refreshToken } = await authService.login(req);

    res.cookie("accessToken", accessToken, {
      maxage: 600000, // 10 minutes
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      maxage: 1000 * 60 * 60 * 24 * 60,
      httpOnly: true,
    });

    sendRes(res, 200, { accessToken, refreshToken });
  }),
};

module.exports = authController;
