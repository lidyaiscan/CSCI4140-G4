const express = require("express");
const router = express.Router();
const poController = require('../controllers/poController');

router.get('/pos', poController.getPos);
router.get('/pos/:poNoG4', poController.getPoByNo);

module.exports = router;