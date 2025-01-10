const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/getAll', UserController.getAllUsers);
router.get('/getById/:id', UserController.getUserById);

module.exports = router;