const express = require('express');
const AuthController = require('../controllers/authController');
const validate = require('../middlewares/validationMiddleware');
const userValidationSchema = require('../validation/userValidation');

const router = express.Router();

router.post('/register', validate(userValidationSchema) , AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;