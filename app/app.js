import express from 'express';
import morgan from 'morgan';
import config from 'config';
import log4js from 'log4js';
import path from 'path';
import index from './routes/index';
import users from './routes/users';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const MAXIMUM_BODY_SIZE = '10mb';

log4js.configure(config.get('log4js'));
const logger = log4js.getLogger('app');
const app = express();
const port = process.env.PORT || config.port;

logger.info(`env.NODE_ENV: ${process.env.NODE_ENV}`);

app.use(morgan('combined'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: MAXIMUM_BODY_SIZE, extended: false }));

// parse application/json
app.use(bodyParser.json({ limit: MAXIMUM_BODY_SIZE }));

// cookie parse
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', index);
app.use('/users', users);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
    logger.info(`Server is Listening port ${port}.`);
});