import {imgUpload} from "../middleware/imgUpload";

const express = require('express');
const router = express.Router();

//Controllers
import * as storyController from '../controllers/story.controller';

// Auth
import * as auth from '../middleware/authenticateRequest';

// Public

router.get('/all', storyController.getAllUndeletedStories);
router.get('/get/:id', storyController.getStoryById);
router.get('/:id/img', storyController.serveImage);

// Protected

// // Info crud

router.get('/all-admin', auth.authenticateRequest, storyController.getAllStories);
router.post('/create', auth.authenticateRequest, storyController.create);
router.put('/update/:id', auth.authenticateRequest, storyController.update);
router.delete('/delete/:id', auth.authenticateRequest, storyController.markDeleted);
router.put('/undelete/:id', auth.authenticateRequest, storyController.markUnDeleted);

// // Img crud

router.post('/upload/:id', auth.authenticateRequest, imgUpload.single('upload'), storyController.uploadImage);

module.exports = router;