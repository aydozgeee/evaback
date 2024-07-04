const { schemasObject } = require('../utils/validationSchemas/index')
const ErrorCodes = require('../utils/errorCodes')

const validator = (validatorName) => {
	const schema = schemasObject['IndexSchemas'][validatorName]
	if (!schema) {
		throw new Error(`'${validatorName}' validator does not exist in 'IndexSchemas' schema`)
	}
	return async (req, res, next) => {
		try {
			req.body = await schema.validateAsync(req.body, { abortEarly: false })
			next()
		} catch (err) {
			return res.status(406).json({
				error: ErrorCodes.validationError,
				message: err.details.reduce((a, b) => `${a} ${b.message},`.replace(/"/g, "'"), ''),
			})
		}
	}
}

module.exports = validator
