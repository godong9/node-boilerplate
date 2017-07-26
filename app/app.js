import express from 'express';
import morgan from 'morgan';
import config from 'config';
import log4js from 'log4js';
import path from 'path';
import index from './routes/index';

log4js.configure(config.get('log4js'));

const logger = log4js.getLogger('app');
const app = express();
const port = process.env.PORT || config.port;

logger.info(`env.NODE_ENV: ${process.env.NODE_ENV}`);

app.use(morgan('combined'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', index);

// error handler
app.use(function(err, req, res) {
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