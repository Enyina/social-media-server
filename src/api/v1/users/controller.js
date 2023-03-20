const catchAsync = require("../../../utils/catchAsync");
const userService = require("./service");

const userController = {
  getUser: catchAsync(async (req, res, next) => {
    const user = userService.getOneById(req.params.id);

    res.status(200).json({
      status: "success",
      data: user,
    });
  }),
  getProfile: catchAsync(async (req, res, next) => {
    const user = userService.getOneByUsername(req.body.username);

    res.status(200).json({
      status: "success",
      data: user,
    });
  }),
  updateUser: catchAsync(async (req, res, next) => {
    const updatedUser = userService.update(req);
    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  }),
  deleteUser: catchAsync(async (req, res, next) => {
    const deletedUser = userService.delete(req);
    res.status(200).json({
      status: "success",
      data: deletedUser,
    });
  }),
};

module.exports = userController;
