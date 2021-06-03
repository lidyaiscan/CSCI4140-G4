const express = require("express");
const router = express.Router();

const poController = require('../controllers/poController');
const partController = require('../controllers/partController');
const clientController = require('../controllers/clientController');

router.get('/pos', poController.getPosG4);
router.get('/pos/:poNoG4', poController.getPoByNoG4);
router.get('/parts', partController.getPartsG4);
router.get('/parts/:partNoG4', partController.getPartByNoG4);
router.get('/clients', clientController.getClientsG4);

module.exports = router;