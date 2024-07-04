// serviceLogger/logger.js
const serviceLogger = (params, res) => {
	const { details, status, service, errorCode, errMessage } = params

	if (details) {
		let message = {
			details: details,
			status: status || 500,
			service: service,
			errorCode: errorCode,
			message: errMessage,
		}

		return res.status(message.status).json(message)
	} else {
		let message = {
			message: 'Something went wrong',
			status: 500,
		}

		return res.status(message.status).json(message)
	}
}

module.exports = serviceLogger
