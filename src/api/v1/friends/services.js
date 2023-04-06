const userService = require("../users/service");
const FriendRequest = require("./models/friendRequest");
const User = require("../users/model");

const friendService = {
  getRequest: async (senderId, receiverId) => {
    const request = await FriendRequest.findOne({
      srcId: senderId,
      dest: receiverId,
    });
    return request;
  },
  allFriends: async (id) => {
    const friends = await userService.getFriends(id);
    return friends;
  },
  sendRequest: async (req) => {
    const { senderId, receiverId } = req.body;
    if (receiverId == senderId) {
      throw new AppError("Can't follow yourself", 400);
    }

    currentUser = await userService.getOneById(senderId);
    if (currentUser.friends.includes(receiverId)) {
      throw new AppError("You are already friends with this user", 400);
    }

    const alreadySent = await friendService.getRequest(senderId, receiverId);
    if (alreadySent) {
      throw new AppError("You have already sent a friend request", 400);
    }
    await FriendRequest.create({
      srcId: senderId,
      dest: receiverId,
    });

    return "request sent successfully";
  },
  acceptRequest: async (req) => {
    const { senderId, receiverId } = req.body;

    await User.findByIdAndUpdate(
      { _id: senderId },
      { $push: { friends: receiverId } },
      { new: true, runValidators: true }
    );
    await User.findByIdAndUpdate(
      { _id: receiverId },
      { $push: { friends: receiverId } },
      { new: true, runValidators: true }
    );

    await FriendRequest.findOneAndDelete(
      { srcId: senderId },
      { destId: receiverId }
    );
    return "Friend added successfully";
  },
  rejectRequet: async (req) => {
    const { senderId, receiverId } = req.body;

    await FriendRequest.findOneAndDelete(
      { srcId: senderId },
      { destId: receiverId }
    );
    return "Friend request rejected";
  },
  unfriend: async (req) => {
    const { senderId, receiverId } = req.body;
    await User.findByIdAndUpdate(
      { _id: senderId },
      { $pull: { friends: receiverId } },
      { new: true, runValidators: true }
    );

    await User.findByIdAndUpdate(
      { _id: receiverId },
      { $pull: { friends: receiverId } },
      { new: true, runValidators: true }
    );

    return "Friend removed successfully";
  },
};

module.exports = friendService;
