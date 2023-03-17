const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
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
    comments: { type: Schema.Types.ObjectId, required: true, ref: "Comment" },
  },
  { timestamps: true }
);

const Post = model("Post", PostSchema);

module.exports = Post;
