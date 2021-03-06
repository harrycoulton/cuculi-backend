import {Request, Response} from "express";

const express = require('express');
const router = express.Router();

//Controllers
import * as authController from '../controllers/auth.controller';

// Middleware
import * as auth from '../middleware/authenticateRequest';

router.post('/login', authController.login);
router.post('/logout', auth.authenticateRequest, authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/password-reset', authController.passwordReset);

module.exports = router;
