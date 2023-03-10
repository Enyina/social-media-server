const { Schema, model } = require("mongoose");

const replySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  desc: {
    type: String,
    max: 500,
  },
  img: {
    type: String,
  },
  likes: {
    type: Array,
    default: [],
  },
  replies: { type: Schema.Types.ObjectId, required: true, ref: "Reply" },
});

module.exports = model("Reply", replySchema);
