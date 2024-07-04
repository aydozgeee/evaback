const TradeService = require('../services/tradeService')
const serviceLogger = require('../utils/serviceLogger/logger')
// import ErrorCauses from '../../utils/serviceLogger/ErrorCauses.json'

const buyPortfolio = async function (req, res) {
	console.log('bajajja 1')
	try {
		const { userId, portfolioId, symbol, quantity } = req.body
		const buyResult = await TradeService.buyPortfolio(userId, portfolioId, symbol, quantity)
		return res.status(200).json({ status: 200, data: buyResult })
	} catch (error) {
		return serviceLogger(
			{
				details: error.details,
				status: error.status,
				errMessage: error.message,
				service: error.service,
				errorCode: error.errorCode,
			},
			res,
			req,
		)
	}
}

const sellPortfolio = async (req, res) => {
	try {
		// İsteğin gövdesinden gerekli parametreleri çıkarın
		const { userId, portfolioId, symbol, quantity } = req.body
		console.log(userId, portfolioId, symbol, quantity)

		// TradeService üzerinden sellPortfolio işlevini çağırın
		const sellResult = await TradeService.sellPortfolio(userId, portfolioId, symbol, quantity)

		// Başarılı yanıtı döndürün
		return res.status(200).json({ status: 200, data: sellResult })
	} catch (error) {
		return serviceLogger(
			{
				details: error.details,
				status: error.status,
				errMessage: error.message,
				service: error.service,
				errorCode: error.errorCode,
			},
			res,
			req,
		)
	}
}

const TradeController = {
	buyPortfolio,
	sellPortfolio,
}

module.exports = TradeController
