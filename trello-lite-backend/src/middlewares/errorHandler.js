const logger = require('./logger');

module.exports = (err,req,res,next) => {
    logger.error(err.stack|| err.message || err);
    const status = err.statusCode || 500;
    res.status(status).json({
        success: false,
        message: err.message || 'internal server error'
    });
};