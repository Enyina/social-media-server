const authService = require("./service");
const { sendRes } = require("./.././.././../utils/sendRes");
const catchAsync = require("../../../utils/catchAsync");

const authController = {
  signup: catchAsync(async (req, res) => {
    const { accessToken, refreshToken } = await authService.register(req);

    sendRes(res, 201, { accessToken, refreshToken });
  }),
  login: catchAsync(async (req, res) => {
    const { accessToken, refreshToken } = await authService.login(req);

    sendRes(res, 200, { accessToken, refreshToken });
  }),
};

module.exports = authController;
