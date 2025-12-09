const mongoose = require('mongoose');
const {logger} = require('../middlewares/logger');

exports.connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        logger.info("mongoDB connected successfully");
    } catch (err) {
        logger.error('mongoDB connection failed:', err.message);
        process.exit(1);
    }
};