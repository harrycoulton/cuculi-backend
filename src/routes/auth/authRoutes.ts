const express = require('express');
const router = express.Router();

//Controllers
import * as authController from '../../controllers/authController';

router.post('/login', authController.login);

module.exports = router;