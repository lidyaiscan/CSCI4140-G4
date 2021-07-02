const express = require("express");
const router = express.Router();

const poController = require('../controllers/poController');
const partController = require('../controllers/partController');
const clientController = require('../controllers/clientController');
const paymentController = require('../controllers/paymentController');

//** Shared Service **//
router.get('/pos', poController.getPosG4);
router.get('/pos/:poNoG4', poController.getPoByNoG4);
router.get('/parts', partController.getPartsG4);
router.get('/parts/:partNoG4', partController.getPartByNoG4);
router.get('/cancelPo/:poNoG4', poController.cancelPo);

//** Client-specific Service **//
router.get('/clients', clientController.getClientsG4);
router.get('/clients/:clientCompIdG4', clientController.getClientByNoG4);
router.get('/client/pos/:clientCompIdG4', poController.clientGetPosG4);
router.get('/client/pos/:clientCompIdG4/:poNoG4', poController.clientGetPoByNoG4);

router.patch('/client/createPo/:clientCompIdG4', poController.createPo);

// additional feature
router.patch('/client/payment/:clientCompIdG4/:poNoG4', paymentController.makePaymentByPoNoAndClientCompIdG4);

//** Agent-specific Service **//
router.get('/agent/pos', poController.getPosG4);
router.get('/agent/pos/:poNoG4', poController.getPoByNoG4);
router.patch('/agent/pos/status/:poNoG4', poController.updatePoStatus);

router.patch('/agent/parts/:partNoG4', partController.updatePartByNoG4);
router.patch('/agent/parts/:partNoG4/price', partController.updatePartPriceByNoG4);
router.patch('/agent/parts/:partNoG4/replenish', partController.replenishPartsByNoG4);
router.patch('/agent/:clientCompIdG4/balance', clientController.updateClient);


module.exports = router;