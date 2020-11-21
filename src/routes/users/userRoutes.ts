const express = require('express');
const router = express.Router();

//Controllers
import * as userController from '../../controllers/userController';

// Auth
import * as auth from '../../middleware/authenticateRequest';

router.get('/all', auth.authenticateRequest, userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/create', userController.createUser);

module.exports = router;