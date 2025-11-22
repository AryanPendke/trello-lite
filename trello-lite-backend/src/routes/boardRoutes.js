const express = require('express');
const router = express.Router();
const path = require("path");
 
const multer = require("multer");
const upload = multer({
  dest: path.join(__dirname, "../../exports")
});

const boardController = require('../controllers/boardController');

router.get('/',boardController.getAllBoards);
router.get('/:id',boardController.getBoardById);
router.post('/',boardController.createBoard);
router.put('/:id',boardController.updateBoard)
router.delete('/:id',boardController.deleteBoardById);

router.get('/:id/export', boardController.exportBoard);
router.post('/import', upload.single('file'), boardController.importBoard);

module.exports = router;
  