const Joi = require('joi')

const buySellSchema = Joi.object({
	userId: Joi.number().integer().required(),
	portfolioId: Joi.number().integer().required(),
	symbol: Joi.string().uppercase().length(3).required(),
	quantity: Joi.number().integer().min(1).required(),
})

module.exports = {
	buySellSchema,
}
