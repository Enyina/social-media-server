const catchAsync = require("../../../utils/catchAsync");
const friendService = require("./services");
const { sendRes } = require("./.././.././.././utils/sendRes");

const friendController = {
  friendList: catchAsync(async (req, res, next) => {
    const friends = friendService.allFriends(req);

    sendRes(res, 200, friends);
  }),

  sendFriendRequest: catchAsync(async (req, res, next) => {
    const sendReq = await friendService.sendRequest(req);

    sendRes(res, 200, sendReq);
  }),

  acceptFriendRequest: catchAsync(async (req, res, next) => {
    const acceptReq = await friendService.acceptRequest(req);

    sendRes(res, 200, acceptReq);
  }),

  rejectFriendRequest: catchAsync(async (req, res, next) => {
    const rejectReq = await friendService.rejectRequest(req);

    sendRes(res, 200, rejectReq);
  }),

  deleteFriend: catchAsync(async (req, res, next) => {
    const deleteReq = await friendService.unfriend(req);

    sendRes(res, 200, deleteReq);
  }),
};

module.exports = friendController;
