const friendController = require("./controllers");

const friendRouter = require("express").Router();

friendRouter
  .route("/:id")
  .get(friendController.friendList)
  .post(friendController.sendFriendRequest)
  .put(friendController.acceptFriendRequest)
  .put(friendController.deleteFriend)
  .delete(friendController.rejectFriendRequest);

module.exports = friendRouter;
