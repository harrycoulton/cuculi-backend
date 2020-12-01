const express = require('express');
const router = express.Router();

//Controllers
import * as userController from '../controllers/user.controller';

// Auth
import * as auth from '../middleware/authenticateRequest';

router.get('/all', auth.authenticateRequest, userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/create', auth.authenticateRequest, userController.createUser);

module.exports = router;