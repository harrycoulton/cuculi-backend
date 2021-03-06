import {imgUpload} from "../middleware/imgUpload";

const express = require('express');
const router = express.Router();

//Controllers
import * as releaseController from '../controllers/release.controller';

// Auth
import * as auth from '../middleware/authenticateRequest';

// Public

router.get('/all', releaseController.getAllUndeletedReleases);
router.get('/get/:id', releaseController.getReleaseById);
router.get('/:id/img', releaseController.serveImage);

// Protected

// // Info crud

router.get('/all-admin', auth.authenticateRequest, releaseController.getAllReleases);
router.post('/create', auth.authenticateRequest, releaseController.create);
router.put('/update/:id', auth.authenticateRequest, releaseController.update);
router.delete('/delete/:id', auth.authenticateRequest, releaseController.markDeleted);
router.put('/undelete/:id', auth.authenticateRequest, releaseController.markUnDeleted);

// // Img crud

router.post('/upload/:id', auth.authenticateRequest, imgUpload.single('upload'), releaseController.uploadImage);


module.exports = router;