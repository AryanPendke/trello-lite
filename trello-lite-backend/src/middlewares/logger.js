const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const winston = require('winston');
const config = require('../config');

const logsDir = path.join(__dirname, '..', '..', 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // file transport
    new winston.transports.File({ filename: path.join(logsDir, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logsDir, 'combined.log') })
  ],
});

// In development, also log to console with simple format
if (config.nodeEnv !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// morgan middleware (write basic http logs to combined.log)
const morganMiddleware = morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
});

module.exports = { logger, morganMiddleware };
