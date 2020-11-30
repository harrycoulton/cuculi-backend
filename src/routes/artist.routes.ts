const express = require('express');
const router = express.Router();

//Controllers
import * as artistController from '../controllers/artist.controller';

// Auth
import * as auth from '../middleware/authenticateRequest';

// Public

router.get('/all', artistController.getAllUndeletedArtists);
router.get('/get/:id', artistController.getArtistById);

// Protected

router.get('/all-admin', auth.authenticateRequest, artistController.getAllArtists);
router.post('/create', auth.authenticateRequest, artistController.create);
router.put('/update/:id', auth.authenticateRequest, artistController.update);
router.delete('/delete/:id', auth.authenticateRequest, artistController.markDeleted);
router.put('/undelete/:id', auth.authenticateRequest, artistController.markUnDeleted);

module.exports = router;