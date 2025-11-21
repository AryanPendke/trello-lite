const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.port || 3000,
    nodeenv: process.env.NODE_ENV || 'development',
    logLevel: process.env.LOG_LEVEL || 'info',
};