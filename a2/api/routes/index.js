const express = require("express");
const router = express.Router();

const poController = require('../controllers/poController');
const partController = require('../controllers/partController');
const clientController = require('../controllers/clientController');
const paymentController = require('../controllers/paymentController');

router.get('/pos', poController.getPosG4);
router.get('/pos/:poNoG4', poController.getPoByNoG4);
router.get('/parts', partController.getPartsG4);
router.get('/parts/:partNoG4', partController.getPartByNoG4);
router.get('/clients', clientController.getClientsG4);
router.get('/clients/:clientCompIdG4', clientController.getClientByNoG4);

// Client API
router.get('/client/pos/:clientCompIdG4', poController.clientGetPosG4);
router.get('/client/pos/:clientCompIdG4/:poNoG4', poController.clientGetPoByNoG4);

// Client Agent service vii. List POs; viii. Track One PO
router.get('/agent/pos', poController.getPosG4);
router.get('/agent/pos/:poNoG4', poController.getPoByNoG4);

// Additional Features
router.patch('/client/payment/:clientCompIdG4/:poNoG4', paymentController.makePaymentByPoNoAndClientCompIdG4);
router.patch('/parts/:partNoG4', partController.updatePartByNoG4);

module.exports = router;