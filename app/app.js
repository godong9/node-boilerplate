const express = require("express");
const morgan = require("morgan");
const config = require("config");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const logger = require("./helpers/logger");
const HttpCode = require("./helpers/httpCode");
const AjaxResponse = require("./helpers/ajaxResponse");
const IndexController = require("./controllers/index");

const MAXIMUM_BODY_SIZE = "10mb";
const MORGAN_LOGGING_TYPE = "short";

const app = express();
const port = process.env.PORT || config.port;

logger.info(`env.NODE_ENV: ${process.env.NODE_ENV}`);

app.use(morgan(MORGAN_LOGGING_TYPE, { stream: logger.stream, }));

// use helmet
app.use(helmet());
app.disable("x-powered-by");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: MAXIMUM_BODY_SIZE, extended: false, }));

// parse application/json
app.use(bodyParser.json({ limit: MAXIMUM_BODY_SIZE, }));

// cookie parse
app.use(cookieParser());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// public path
app.use(express.static(path.join(__dirname, "public")));

// route settings
app.use("/", IndexController);

/* eslint-disable no-unused-vars */
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  logger.error(err);

  // send error response
  res.status(err.status || HttpCode.INTERNAL_SERVER_ERROR);
  res.send(AjaxResponse.error("Server error!"));
});

app.listen(port, () => {
  logger.info(`Server NODE_ENV: ${process.env.NODE_ENV}`);
  logger.info(`Server is Listening port ${port}.`);
});

process
  .on("unhandledRejection", (reason, p) => {
    logger.error("Unhandled Rejection at:", p, "reason:", reason);
  });

module.exports = app;
