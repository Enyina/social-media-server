const AppError = require("../../../utils/appError");
const userService = require("../users/service");
const Identity = require("./model/identity");
const JWTservice = require("./../.././../utils/JWTservice");
const JWTHelpers = require("./../.././../utils/JWTservice");

const authService = {
  register: async (req) => {
    const newUser = await userService.create(req);

    const { accessToken, refreshToken } = JWTHelpers.generateToken(newUser._id);

    await Identity.create({
      userId: newUser._id,
      accessToken,
      refreshToken,
    });
    return { accessToken, refreshToken, newUser };
  },
  login: async (req) => {
    const { username, email, password } = req.body;
    try {
      const user = await userService.getOneByEmail(email, password);
      console.log(user);
      // await user.comparePasswords(password);
      const { accessToken, refreshToken } = JWTservice.generateToken(user._id);

      await Identity.findOneAndUpdate(
        { userId: user._id },
        { accessToken, refreshToken },
        {
          new: true,
          runValidators: true,
        }
      );
      return { accessToken, refreshToken, user };
    } catch (error) {
      console.log(error);
      throw new AppError("Invalid user credentials", 401);
    }
  },
  // refreshToken: async ({ userId, refreshToken }) => {
  //   const identification = await Identity.findOne({
  //     _id: userId,
  //     refreshToken,
  //   });
  //   if (!identification) {
  //     throw new AppError("Refresh token is not valid.", 401);
  //   }
  //   const { accessToken, refreshToken: refToken } = JWTHelper.generateTokens(
  //     identification.userId
  //   );
  //   await Identity.findOneAndUpdate(identification._id, {
  //     authToken: accessToken,
  //     refreshToken: refToken,
  //   });
  //   return { accessToken, refreshToken: refToken };
  // },
};
module.exports = authService;
