// src/scripts/seed.js
const { sequelize, User, Portfolio, Share, Transaction, PortfolioShares } = require('../models')

async function seedDatabase() {
	try {
		console.info('Seeding database...')

		await sequelize.sync()
		const shouldSeed = process.env.DB_SEED === 'true'
		if (!shouldSeed) {
			console.log('Skipping seed operation.')
			return
		}
		// Create Users
		const user1 = await User.create({ username: 'user1' })
		const user2 = await User.create({ username: 'user2' })
		const user3 = await User.create({ username: 'user3' })
		const user4 = await User.create({ username: 'user4' })
		const user5 = await User.create({ username: 'user5' })

		// Create Portfolios for Users
		const portfolio1 = await Portfolio.create({ name: 'portfolio1', UserId: user1.id })
		const portfolio2 = await Portfolio.create({ name: 'portfolio2', UserId: user2.id })
		const portfolio3 = await Portfolio.create({ name: 'portfolio3', UserId: user3.id })
		const portfolio4 = await Portfolio.create({ name: 'portfolio4', UserId: user4.id })
		const portfolio5 = await Portfolio.create({ name: 'portfolio5', UserId: user5.id })

		// Create Shares
		const share1 = await Share.create({ symbol: 'ABC', name: 'Company ABC', rate: 11.0 })
		const share2 = await Share.create({ symbol: 'XYZ', name: 'Company XYZ', rate: 15.5 })

		// Add Shares to Portfolios
		await portfolio1.addShare(share1, { through: { quantity: 100 } })
		await portfolio1.addShare(share2, { through: { quantity: 50 } })
		await portfolio2.addShare(share1, { through: { quantity: 80 } })
		await portfolio3.addShare(share1, { through: { quantity: 60 } })
		await portfolio4.addShare(share2, { through: { quantity: 70 } })
		await portfolio5.addShare(share2, { through: { quantity: 90 } })

		// Create Transactions
		await Transaction.bulkCreate([
			{ type: 'BUY', quantity: 10, price: 100.0, UserId: user1.id, ShareId: share1.id },
			{ type: 'SELL', quantity: 5, price: 50.0, UserId: user1.id, ShareId: share2.id },
			{ type: 'BUY', quantity: 20, price: 220.0, UserId: user2.id, ShareId: share1.id },
			{ type: 'SELL', quantity: 15, price: 200.0, UserId: user2.id, ShareId: share2.id },
			{ type: 'BUY', quantity: 15, price: 165.0, UserId: user3.id, ShareId: share1.id },
			{ type: 'SELL', quantity: 10, price: 120.0, UserId: user3.id, ShareId: share2.id },
			{ type: 'BUY', quantity: 25, price: 275.0, UserId: user4.id, ShareId: share1.id },
			{ type: 'SELL', quantity: 20, price: 300.0, UserId: user4.id, ShareId: share2.id },
			{ type: 'BUY', quantity: 30, price: 330.0, UserId: user5.id, ShareId: share1.id },
			{ type: 'SELL', quantity: 25, price: 375.0, UserId: user5.id, ShareId: share2.id },
		])

		const users = await User.findAll()
		const portfolios = await Portfolio.findAll()
		const shares = await Share.findAll()
		const transactions = await Transaction.findAll()
		const portfolioShares = await PortfolioShares.findAll()
		console.log('Users:', JSON.stringify(users, null, 2))
		console.log('Portfolios:', JSON.stringify(portfolios, null, 2))
		console.log('Shares:', JSON.stringify(shares, null, 2))
		console.log('Transactions:', JSON.stringify(transactions, null, 2))
		console.log('portfolioShares:', JSON.stringify(portfolioShares, null, 2))

		console.log('Database & tables synced and seeded!')
	} catch (error) {
		console.error('Error seeding database:', error)
	}
}

module.exports = { seedDatabase }
