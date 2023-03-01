require("dotenv").config();

const app = require("./app");
const config = require("./config");
const logger = require("./config/winston");
const connectDB = require("./db");

connectDB()
  .then(() => logger.info("DB connection successful"))
  .catch((error) => logger.info(error.message));

app.listen(config.port, () => logger.info(`listening on port ${config.port}`));
