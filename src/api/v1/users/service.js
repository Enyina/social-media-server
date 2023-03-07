const User = require("./model");
const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");

const userService = {
  getOne: catchAsync(async (req) => {
    const userId = req.body.userId;
    const username = req.body.username;

    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username });
    return user;
  }),
  update: catchAsync(async (req) => {
    if (req.body.userId !== req.params.id || !req.body.isAdmin) {
      throw new AppError("You can't update another user's account", 403);
    }

    if (req.body.password && !req.body.isAdmin) {
      throw AppError("can't update password from this route", 403);
    }
    if (Object.keys(updates).length === 0) {
      throw new AppError("PLease provide a field to update", 400);
    }
    const updatedUser = await User.findByIdAndUpdate(userid, updates, {
      new: true,
      runValidators: true,
    });
    return updatedUser;
  }),
  delete: catchAsync(async (id) => {
    if (req.body.userId !== req.params.id || !req.body.isAdmin) {
      throw new AppError("You can't update another user's account", 403);
    }

    await User.findByIdAndDelete(id);

    return null;
  }),
};
