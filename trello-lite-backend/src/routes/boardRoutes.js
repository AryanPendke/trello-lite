const express = require('express');
const router = express.Router();

const boardController = require('../controllers/boardController');

router.get('/',boardController.getAllBoards);
router.get('/:id',boardController.getBoardById);
router.post('/',boardController.createBoard);
router.put('/:id',boardController.updateBoard)
router.delete('/:id',boardController.deleteBoardById);

router.get('/:id/export', boardController.exportBoard);
router.post('/import', boardController.importBoard);

module.exports = router;
