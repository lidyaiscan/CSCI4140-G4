const express = require("express");
const router = express.Router();
const poController = require('../controllers/poController');
const partsController = require('../controllers/partsController');

router.get('/pos', poController.getPos);
router.get('/pos/:poNoG4', poController.getPoByNo);
router.get('/clients', poController.getClients);
router.get('/parts', partsController.getParts);
router.get('/parts/:partNoG4', poController.getPartByNo);

module.exports = router;