const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateObjectId = require('../middlewares/validateObjectId');

router.get('/',userController.getAllUsers);
router.get('/:id', validateObjectId, userController.getUserById);
router.post('/',userController.createUser);
router.put('/:id', validateObjectId, userController.updateUser);
router.delete('/:id', validateObjectId, userController.deleteUser);

module.exports = router;

