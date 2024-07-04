const express = require('express');
const router = express.Router();
const TradeController = require('../controllers/trade.controller');

router.post('/buy', TradeController.buyPortfolio);
router.post('/sell', TradeController.sellPortfolio);

module.exports = router;
