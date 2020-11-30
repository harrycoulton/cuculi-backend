const express = require('express');
const router = express.Router();

// Routes
const artistRouter = require('./artist.routes');
const authRouter = require('./auth.routes');
const releaseRouter = require('./release.routes');
const storyRouter = require('./story.routes');
const userRouter = require('./user.routes');

router.use('/artists', artistRouter);
router.use('/auth', authRouter);
router.use('/releases', releaseRouter);
router.use('/stories', storyRouter);
router.use('/users', userRouter);

module.exports = router;
