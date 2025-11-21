const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.port || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    logLevel: process.env.LOG_LEVEL || 'info',
};