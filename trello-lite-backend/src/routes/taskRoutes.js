const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const validateObjectId = require('../middlewares/validateObjectId');

router.get('/:boardId', validateObjectId, taskController.getTasksByBoard);
router.post('/:boardId', validateObjectId, taskController.createTask);
router.put('/:taskId', validateObjectId, taskController.updateTask);
router.delete('/:taskId', validateObjectId, taskController.deleteTask);
router.post('/:taskId/move/:targetBoardId', validateObjectId, taskController.moveTask);

module.exports = router;