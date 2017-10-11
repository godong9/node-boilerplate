import winston from "winston";
import config from "config";
import "winston-daily-rotate-file";

const logger = new winston.Logger({});

logger.configure({
  transports: [
    new winston.transports.Console(config.get("logger").console),
    new winston.transports.File(config.get("logger").file),
    new winston.transports.DailyRotateFile(config.get("logger").rotate),
  ]
});

logger.stream = {
  write: function(message){
    logger.info(message);
  }
};

export default logger;