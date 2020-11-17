const express = require('express');
const router = express.Router();
const app = express();

// Routes
const userRouter = require('./users/userRoutes');

router.use('/users', userRouter);

module.exports = router;
