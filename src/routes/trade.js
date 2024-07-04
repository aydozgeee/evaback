const express = require('express')
const router = express.Router()
const TradeController = require('../controllers/trade.controller')
const validator = require('../middlewares/validator')

router.post('/buy', validator('buySellSchema'), TradeController.buyPortfolio)
router.post('/sell', validator('buySellSchema'), TradeController.sellPortfolio)

module.exports = router
