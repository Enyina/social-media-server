const authService = require("./service");
const { sendRes } = require("./.././.././../utils/sendRes");
const catchAsync = require("../../../utils/catchAsync");

const authController = {
  signup: catchAsync(async (req, res) => {
    const { accessToken, refreshToken } = await authService.register(req);

    res.cookies("accessToken", access, {
      maxage: 600000, // 10 minutes
      httpOnly: true,
    });
    res.cookies("accessToken", access, {
      maxage: 1000 * 60 * 60 * 24 * 60,
      httpOnly: true,
    });

    sendRes(res, 201, { accessToken, refreshToken });
  }),
  login: catchAsync(async (req, res) => {
    const { accessToken, refreshToken } = await authService.login(req);

    res.cookies("accessToken", access, {
      maxage: 600000, // 10 minutes
      httpOnly: true,
    });
    res.cookies("accessToken", access, {
      maxage: 1000 * 60 * 60 * 24 * 60,
      httpOnly: true,
    });

    sendRes(res, 200, { accessToken, refreshToken });
  }),
};

module.exports = authController;
