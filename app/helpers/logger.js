const winston = require("winston");
const config = require("config");
const dailyLogRotate = require("winston-daily-rotate-file");

const logger = new winston.Logger({});

winston.transports.DailyLogRotate = dailyLogRotate;

logger.configure({
  transports: [
    new winston.transports.Console(config.get("logger").console),
    new winston.transports.File(config.get("logger").file),
    new winston.transports.DailyRotateFile(config.get("logger").rotate),
  ],
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

module.exports = logger;
