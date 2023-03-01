const winston = require("winston");
const config = require("./index");

const options = {
  file: {
    level: "http",
    dirname: config.opt,
    filename: "SocialApp_logger.log",
    datePattern: "YYYY-MM-DD",
    maxSize: "512m",
    maxFiles: 5,
    colorize: false,
    handleExceptions: true,
    handleRejections: true,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

exports.stream = {
  write: (message) => {
    logger.info(message);
  },
};

module.exports = logger;
