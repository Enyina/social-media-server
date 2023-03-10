const AppError = require("../../../utils/appError");
const userService = require("../users/service");
const Comment = require("./models/comments");
const Post = require("./models/post");
const reply = require("./models/reply");
const User = require("../users/model");

const postService = {
  createPost: async (req) => {
    const newPost = await Post.create(req.body);
    return newPost;
  },
  createComment: async (req) => {
    const newComment = await Comment.create(req.body);
    return newComment;
  },
  creatReply: async (req) => {
    const newReply = await reply.create(req.body);
    return newReply;
  },
  getAllUserPost: async (req) => {
    const { username } = req.body;
    try {
      const user = await userService.getOne(username);
      const posts = await Post.find({ userId: user.id });
      return posts;
    } catch (error) {
      console.log(error);
      throw new AppError("invalid user", 400);
    }
  },
  getAllPostComments: async (req) => {
    const { postId } = req.body;
    try {
      const post = await Post.findById(postId);
      const comments = await Comment.find({ userId: post.id });
      return comments;
    } catch (error) {
      console.log(error);
      throw new AppError("invalid request", 400);
    }
  },
  getAllCommentReplies: async (req) => {
    const { commentId } = req.body;
    try {
      const comment = await Comment.findById(commentId);
      const replies = await reply.find({ userId: comment.id });
      return replies;
    } catch (error) {
      console.log(error);
      throw new AppError("invalid request", 400);
    }
  },
  getOne: async (req) => {
    const { postId, commentId, replyId } = req.params;
    try {
      if (postId) {
        const post = await Post.findById(id);
        return post;
      } else if (commentId) {
        const comment = await Comment.findById(commentId);
        return comment;
      } else {
        const reply = await reply.findById(replyId);
        return reply;
      }
    } catch (error) {
      console.log(error);
      throw new AppError("invalid request", 400);
    }
  },

  updateResource: async (req) => {
    const { postId, commentId, replyId } = req.params;
    try {
      if (postId) {
        const post = await Post.findByIdAndUpdate({ _id: postId }, req.body, {
          new: true,
          runValidators: true,
        });
        return post;
      } else if (commentId) {
        const comment = await Comment.findByIdAndUpdate(
          { _id: commentId },
          req.body,
          { new: true, runValidators: true }
        );
        return comment;
      } else {
        const reply = await reply.findByIdAndUpdate(
          { _id: replyId },
          req.body,
          { new: true, runValidators: true }
        );
        return reply;
      }
    } catch (error) {
      console.log(error);
      throw new AppError("invalid request", 400);
    }
  },
  deleteResource: async (req) => {
    const { postId, commentId, replyId } = req.params;
    try {
      if (postId) {
        await Post.findByIdAndUpdate({ _id: postId });
      } else if (commentId) {
        await Comment.findByIdAndDelete({ _id: commentId });
      } else {
        const reply = await reply.findByIdAndDelete({ _id: replyId });
      }
      return null;
    } catch (error) {
      console.log(error);
      throw new AppError("invalid request", 400);
    }
  },
  like: async (req) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
      }
      return "success";
    } catch (err) {
      console.log(err);
      throw new AppError("invalid request", 400);
    }
  },
  getTimeline: async (req) => {
    const { username: userId } = req.body;
    try {
      const user = await User.findOne({ username: userId }).populate("friends");
      const userPosts = await Post.find({ userId: user.id });
      const friendPosts = await Promise.all(
        user.friends.map((friend) => postService.getAllUserPost(friend._id))
      );
      const timeline = userPosts.concat(...friendPosts);

      return timeline;
    } catch (error) {
      console.log(error);
      throw new AppError("invalid user", 400);
    }
  },
};

module.exports = postService;
