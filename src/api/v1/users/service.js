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
  getOneById: async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found", 400);
    }
    return user;
  },
  getOneByEmail: async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError("User not found", 400);
    }
    const bn = await user.comparePassword(password);
    return user;
  },
  getOneByUsername: async (username) => {
    const user = await User.findOne({ username });
    if (!user) {
      throw new AppError("User not found", 400);
    }

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
