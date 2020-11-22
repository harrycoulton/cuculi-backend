const express = require('express');
const router = express.Router();

//Controllers
import * as artistController from '../../controllers/artistController';

// Auth
import * as auth from '../../middleware/authenticateRequest';

router.post('/create', artistController.create);

module.exports = router;