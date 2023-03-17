const User = require("./model");
const AppError = require("../../../utils/appError");

const FriendRequest = require("../friends/models/friendRequest");

const userService = {
  create: async (req) => {
    const { username, firstName, lastName, email, password } = req.body;
    try {
      const user = await User.create({
        username,
        // firstName,
        // lastName,
        email,
        password,
      });

      return user;
    } catch (error) {
      log.error(error);
    }
  },
  getOne: async (req) => {
    const userId = req.body.userId;
    const username = req.body.username;

    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username });
    return user;
  },
  update: async (req) => {
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
  },
  delete: async (req) => {
    if (req.body.userId !== req.params.id || !req.body.isAdmin) {
      throw new AppError("You can't update another user's account", 403);
    }

    await User.findByIdAndDelete(id);

    return null;
  },
  getFriends: async (id) => {
    const user = await User.findById(id).populate("friends");
    const friends = user.friends;
    return friends;
  },
};

module.exports = userService;
