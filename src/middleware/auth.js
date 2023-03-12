const authService = require("../api/v1/auth/service");
const userService = require("../api/v1/users/service");
const JWTHelpers = require("../utils/JWTservice");

const authMiddleware = {
  isAuthenticated: async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;
    if (accessToken) {
      const { payload, expired } = JWTHelpers.verifyToken(accessToken);
      // valid access token
      if (payload) {
        req.userId = payload;
        return next();
      }
    }
    if (!refreshToken) {
      return next();
    }
    // expired but valid access token
    const { payload: userId } =
      expired && refreshToken
        ? JWTHelpers.verifyToken(refreshToken)
        : { payload: null };

    if (!userId) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }
    const { accessToken: access, refreshToken: refresh } =
      await authService.refreshToken(userId, refreshToken);

    res.cookies("accessToken", access, {
      maxage: 600000, // 10 minutes
      httpOnly: true,
    });
    res.cookies("accessToken", access, {
      maxage: 60 * 60 * 24 * 60,
      httpOnly: true,
    });

    req.user = JWTHelpers.verifyToken(access).payload;

    return next();
  },
};

module.exports = authMiddleware;
