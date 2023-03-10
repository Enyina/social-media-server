const AppError = require("../../../utils/appError");
const userService = require("../users/service");
const Identity = require("./model/identity");

const authService = {
  register: async (req) => {
    const newUser = userService.create(req);
    const { accessToken, refreshToken } = JWTservice.generateToken(newUser._id);

    await Identity.create({
      userId: newUser._id,
      accessToken,
      refreshToken,
    });
    return { accessToken, refreshToken };
  },
  login: async (req) => {
    const { username, email, password } = req.body;
    try {
      const user = await userService.getOne(username);
      await user.comparePassword(password);
      const { accessToken, refreshToken } = JWTservice.generateToken(user._id);

      await Identity.findByIdAndUpdate(
        { userId: user._id },
        { accessToken, refreshToken },
        {
          new: true,
          runValidators: true,
        }
      );
    } catch (error) {
      console.log(error);
      throw new AppError("Invalid user credentials", 401);
    }

    return { accessToken, refreshToken };
  },
};
module.exports = authService;
