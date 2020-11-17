const express = require('express');
const router = express.Router();
const app = express();
import { Request, Response } from 'express';

//Controllers
import * as userController from '../../controllers/userController';

router.get('/all', userController.getAllUsers);

// router.post('/create', userController.createUser);
router.post('/create', userController.createUser);

module.exports = router;