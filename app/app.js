import express from "express";
import morgan from "morgan";
import config from "config";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import logger from "./helpers/logger";
import HttpCode from "./helpers/httpCode";

import index from "./controllers/index";

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
app.use("/", index);

/* eslint-disable no-unused-vars */
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  logger.error(err);

  // render the error page
  res.status(err.status || HttpCode.INTERNAL_SERVER_ERROR);
  res.render("error");
});

app.listen(port, () => {
  logger.info(`Server is Listening port ${port}.`);
});

module.exports = app;
