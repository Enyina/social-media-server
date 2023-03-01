const { connect, set } = require("mongoose");
const config = require("../config");

const connectDB = async () => {
  if (!config.database.url) {
    throw new Error("Please provide a database url string");
  }

  set("strictQuery", false);
  return await connect(config.database.url);
};

module.exports = connectDB;
