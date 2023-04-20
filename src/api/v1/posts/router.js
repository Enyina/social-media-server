const postController = require("./controllers");

const postRouter = require("express").Router();

postRouter.route("/").post(postController.newPost);

postRouter.route("/:postId/comments").post(postController.newComment);
postRouter.route("/:postId/replies").post(postController.newReply);
postRouter.route("/:postId/likes").put(postController.like);

postRouter.route("/timeline").get(postController.Timeline);

postRouter
  .route("/:postId")
  .get(postController.getOne)
  .get(postController.allPosts)
  .patch(postController.update)
  .delete(postController.delete);

postRouter
  .route("/:commentId")
  .get(postController.getOne)
  .get(postController.allComments)
  .patch(postController.update)
  .delete(postController.delete);

postRouter
  .route("/:replyId")
  .get(postController.getOne)
  .get(postController.allReplies)
  .patch(postController.update)
  .delete(postController.delete);

module.exports = postRouter;
