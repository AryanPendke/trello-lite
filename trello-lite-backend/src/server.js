const http = require('http');
const app = require('./app');
const config = require('./config');
const {logger} = require('./middlewares/logger');
const {connectDB} = require('./config/db');

connectDB();

const port = config.port;

const server = http.createServer(app);

server.listen(port, () => {
    logger.info(`Server listening at port ${port} in ${config.nodeEnv} mode`);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down.');
  server.close(() => process.exit(0));
});
