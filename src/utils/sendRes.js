module.exports = {
  sendRes: (res, status, data) => {
    res.status(status).json({
      status: "success",
      data,
    });
  },
};
