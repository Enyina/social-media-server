const { Schema, model } = require("mongoose");

const FriendRequestSchema = new Schema(
  {
    srcId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    destId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

const friendRequest = model("FriendRequest", FriendRequestSchema);

module.exports = friendRequest;
