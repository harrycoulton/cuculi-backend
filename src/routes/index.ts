const express = require('express');
const router = express.Router();

// Routes
const artistRouter = require('./artists/artistRoutes');
const authRouter = require('./auth/authRoutes');
const userRouter = require('./users/userRoutes');

router.use('/artists', artistRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);

module.exports = router;
