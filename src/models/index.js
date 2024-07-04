const { Sequelize } = require('sequelize')
const { sequelize, DataTypes } = require('../config/database')
const User = require('./user')(sequelize, DataTypes)
const Portfolio = require('./portfolio')(sequelize, DataTypes)
const Share = require('./share')(sequelize, DataTypes)
const Transaction = require('./transaction')(sequelize, DataTypes)
const PortfolioShares = require('./portfolioShares')(sequelize, DataTypes)

const models = { User, Portfolio, Share, Transaction, PortfolioShares }
console.log('burdaaaa')
Object.keys(models).forEach((modelName) => {
	if (models[modelName].associate) {
		models[modelName].associate(models)
	}
})

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models
