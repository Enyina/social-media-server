const catchAsync = require("../../../utils/catchAsync");
const sendRes = require("../../../utils/sendRes");
const postService = require("./services");

const postController = {
  newPost: catchAsync(async (req, res, next) => {
    const newPost = postService.createPost(req);
    sendRes(res, 201, newPost);
  }),
  newComment: catchAsync(async (req, res, next) => {
    const newComment = postService.createComment(req);
    sendRes(res, 200, newComment);
  }),
  newReply: catchAsync(async (req, res, next) => {
    const newReply = postService.createReply(req);
    sendRes(res, 200, newReply);
  }),
  allPosts: catchAsync(async (req, res, next) => {
    const posts = await postService.getAllUserPost(req);
    sendRes(res, 200, posts);
  }),
  getOne: catchAsync(async (req, res, next) => {
    const resource = await postService.getOne(req);
    sendRes(res, 200, resource);
  }),
  allComments: catchAsync(async (req, res, next) => {
    const comments = await postService.getAllPostComments(req);
    sendRes(res, 200, comments);
  }),
  allReplies: catchAsync(async (req, res, next) => {
    const replies = await postService.getAllPostComments(req);
    sendRes(res, 200, replies);
  }),
  update: catchAsync(async (req, res, next) => {
    const resource = await postService.updateResource(req);
    sendRes(res, 200, resource);
  }),
  delete: catchAsync(async (req, res, next) => {
    const resource = await postService.deleteResource(req);
    sendRes(res, 200, resource);
  }),
  like: catchAsync(async (req, res, next) => {
    const result = await postService.like(req);
    sendRes(res, 200, result);
  }),
  Timeline: catchAsync(async (req, res, next) => {
    const timelime = await postService.getTimeline(req);
    // sendRes(res, 200, timelime);
    res.status(200).json({
      status: "success",
      timelime,
    });
  }),
};

module.exports = postController;
