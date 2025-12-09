const mongoose = require('mongoose');

/**
 * Middleware to validate MongoDB ObjectId
 * Usage: router.get('/:id', validateObjectId, controller.method)
 */
const validateObjectId = (req, res, next) => {
  const idParams = ['id', 'boardId', 'taskId', 'targetBoardId', 'ownerId'];
  
  for (const param of idParams) {
    if (req.params[param] && !mongoose.Types.ObjectId.isValid(req.params[param])) {
      return res.status(400).json({
        success: false,
        message: `Invalid ${param} format`
      });
    }
  }
  
  next();
};

module.exports = validateObjectId;

