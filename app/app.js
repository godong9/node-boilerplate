import express from 'express';
import morgan from 'morgan';
import config from 'config';
import log4js from 'log4js';

log4js.configure(config.get('log4js'));

const logger = log4js.getLogger('app');
const app = express();
const port = process.env.PORT || config.port;

logger.info(process.env.NODE_ENV);

app.use(morgan('combined'));

app.get('/', function (req, res) {
    res.send('hello, world!')
});

app.listen(port, () => {
    logger.info(`Server is Listening port ${port}.`);
});