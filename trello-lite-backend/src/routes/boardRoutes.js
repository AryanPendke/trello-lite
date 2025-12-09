const express = require('express');
const router = express.Router();
const path = require("path");
 
const multer = require("multer");
const upload = multer({
  dest: path.join(__dirname, "../../exports")
});

const boardController = require('../controllers/boardController');
const validateObjectId = require('../middlewares/validateObjectId');

router.get('/',boardController.getAllBoards);
router.get('/:id/export', validateObjectId, boardController.exportBoard);
router.get('/:id', validateObjectId, boardController.getBoardById);
router.post('/',boardController.createBoard);
router.post('/import', upload.single('file'), boardController.importBoard);
router.put('/:id', validateObjectId, boardController.updateBoard)
router.delete('/:id', validateObjectId, boardController.deleteBoardById);

module.exports = router;
  