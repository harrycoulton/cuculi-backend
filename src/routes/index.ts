const express = require('express');
const router = express.Router();
const app = express();

// Routes
const userRouter = require('./users/userRoutes');
const authRouter = require('./auth/authRoutes');

router.use('/users', userRouter);
router.use('/auth', authRouter);

module.exports = router;
