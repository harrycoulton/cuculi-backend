import {Request, Response} from "express";

const express = require('express');
const router = express.Router();

//Controllers
import * as authController from '../../controllers/authController';

// Middleware
import * as auth from '../../middleware/authenticateRequest';


router.post('/login', authController.login);
router.post('/logout', auth.authenticateRequest, authController.logout);

module.exports = router;