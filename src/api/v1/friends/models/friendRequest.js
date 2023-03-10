const { Schema, model } = require("mongoose");

const FriendRequestSchema = new Schema(
  {
    srcId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    destId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

module.exports = model("FriendRequest", FriendRequestSchema);
