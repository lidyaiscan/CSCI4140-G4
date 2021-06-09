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

//client agent service vii. List POs; viii. Track One PO
router.get('/clientAgent/pos', poController.getPosG4);
router.get('/clientAgent/pos/:poNoG4', poController.getPoByNoG4);

module.exports = router;