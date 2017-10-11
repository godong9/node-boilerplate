import express from "express";
import morgan from "morgan";
import config from "config";
import log4js from "log4js";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import logger from "./utils/logger";
import HttpCode from "./utils/httpCode";

import index from "./routes/index";
import users from "./routes/users";

const MAXIMUM_BODY_SIZE = "10mb";
const MORGAN_LOGGING_TYPE = 'short';

const app = express();
const port = process.env.PORT || config.port;

logger.info(`env.NODE_ENV: ${process.env.NODE_ENV}`);

// use helmet
app.use(helmet());
app.disable("x-powered-by");

app.use(morgan(MORGAN_LOGGING_TYPE, { "stream": logger.stream }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: MAXIMUM_BODY_SIZE, extended: false }));

// parse application/json
app.use(bodyParser.json({ limit: MAXIMUM_BODY_SIZE }));

// cookie parse
app.use(cookieParser());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", index);
app.use("/users", users);

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || HttpCode.INTERNAL_SERVER_ERROR);
  res.render("error");
});

app.listen(port, () => {
  logger.info(`Server is Listening port ${port}.`);
});

module.exports = app;