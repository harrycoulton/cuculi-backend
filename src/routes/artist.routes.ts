import {imgUpload} from "../middleware/imgUpload";

const express = require('express');
const router = express.Router();

//Controllers
import * as artistController from '../controllers/artist.controller';

// Auth
import * as auth from '../middleware/authenticateRequest';

// Public

router.get('/all', artistController.getAllUndeletedArtists);
router.get('/get/:id', artistController.getArtistById);
router.get('/:id/img', artistController.serveImage);

// Protected

// Info crud

router.get('/all-admin', auth.authenticateRequest, artistController.getAllArtists);
router.post('/create', auth.authenticateRequest, artistController.create);
router.put('/update/:id', auth.authenticateRequest, artistController.update);
router.delete('/delete/:id', auth.authenticateRequest, artistController.markDeleted);
router.put('/undelete/:id', auth.authenticateRequest, artistController.markUnDeleted);

// Img crud

router.post('/upload/:id', auth.authenticateRequest, imgUpload.single('upload'), artistController.uploadImage);

module.exports = router;