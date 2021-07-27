const express = require("express");
const router = express.Router();

const poController = require('../controllers/poController');
const partController = require('../controllers/partController');
const clientController = require('../controllers/clientController');
const paymentController = require('../controllers/paymentController');
const authenticationController = require('../controllers/authenticationController');

//** Shared Service **//
router.get('/pos', poController.getPosG4);
router.get('/pos/:poNoG4', poController.getPoByNoG4);
router.get('/parts', partController.getPartsG4);
router.get('/parts/:partNoG4', partController.getPartByNoG4);
router.get('/cancelPo/:poNoG4', poController.cancelPoG4);

//** Client-specific Service **//
router.get('/clients', clientController.getClientsG4);
router.get('/clients/:clientCompIdG4', clientController.getClientByNoG4);
router.get('/client/pos/:clientCompIdG4', poController.clientGetPosG4);
router.get('/client/pos/:clientCompIdG4/:poNoG4', poController.clientGetPoByNoG4);
//Added at A4
router.get('/client/pos/summary/:clientCompIdG4/:poNoG4', poController.clientGetPoSummaryG4);
router.patch('/client/createPo/:clientCompIdG4', poController.createPoG4);
//Added at A4 (create a PO with varying number of PO Lines in one transaction)
router.patch('/client/createpowithdetails/:clientCompIdG4', poController.createpowithdetails);
// additional feature
router.patch('/client/payment/:clientCompIdG4/:poNoG4', paymentController.makePaymentByPoNoAndClientCompIdG4);

//** Agent-specific Service **//
router.get('/agent/pos', poController.getPosG4);
router.get('/agent/pos/:poNoG4', poController.getPoByNoG4);
router.patch('/agent/parts/:partNoG4', partController.updatePartByNoG4);
router.patch('/agent/parts/:partNoG4/price', partController.updatePartPriceByNoG4);
router.patch('/agent/parts/:partNoG4/replenish', partController.replenishPartsByNoG4);
router.patch('/agent/:clientCompIdG4', clientController.updateClient);
router.patch('/agent/pos/status/:poNoG4', poController.updatePoStatusG4);
router.get('/agent/pos/client/:clientCompIdG4/:poNoG4', poController.clientGetPoAndClientG4);
router.get('/agent/pos/checkqty/:PONoG4/:commandG4', poController.agentCheckQTY);

router.post('/authenticate/client', authenticationController.loginClientG4);
router.post('/authenticate/agent', authenticationController.loginAgentG4);

module.exports = router;
