const ErrorCauses = require('../utils/serviceLogger/ErrorCauses.json')

const { User, Portfolio, Share, Transaction } = require('../models')

async function buyPortfolio(userId, portfolioId, symbol, quantity) {
  try {
    const user = await User.findByPk(userId, { include: Portfolio });
    if (!user) {
      throw new Error('Bad request: User not found.')
    }
    const portfolio = await Portfolio.findByPk(portfolioId, { include: Share });
    if (!portfolio) {
      throw new Error('Bad request: Portfolio not found or does not belong to the user.')
    }
    const share = await Share.findOne({ where: { symbol } });
    if (!share) {
      throw new Error('Bad request: Share not found.')
    }
    const latestRate = share.rate;
    const transaction = await Transaction.create({
      type: 'BUY',
      quantity,
      price: latestRate * quantity,
      timestamp: new Date(),
      UserId: user.id, 
      ShareId: share.id, 
    });
    await portfolio.addShare(share, { through: { quantity } });
return { status: 200, data: transaction };
} catch (error) {
		throw Object.assign({
			details: error.details ?? error.response.data.error.root_cause[0],
			status: error.status ?? error.response.data.status ?? error.response.status,
			message: ErrorCauses.TradeService['001'],
			service: 'TradeService',
			errorCode: '001',
		})
	}
}

async function sellPortfolio(userId, portfolioId, symbol, quantity) {
  try {
    const user = await User.findByPk(userId, { include: Portfolio });
    if (!user) {
      throw new Error('Bad request: User not found..')
    }
    const portfolio = await Portfolio.findByPk(portfolioId, { include: Share });
    if (!portfolio) {
      throw new Error('Bad request: Portfolio not found or does not belong to the user.')
    }
    const share = await Share.findOne({ where: { symbol } });
    if (!share) {
      throw new Error('Bad request: Share not found.')
    }
    const latestRate = share.rate;
    const shareInPortfolio = portfolio.Shares.find(s => s.symbol === symbol);
    if (!shareInPortfolio || shareInPortfolio.PortfolioShares.quantity < quantity) {
      return { error: 'Insufficient shares in the portfolio.' };
    }
     await Transaction.create({
      type: 'SELL',
      quantity,
      price: latestRate * quantity,
      timestamp: new Date(),
    });
    const deleteResponse=await portfolio.removeShare(share, { through: { quantity } });

    return deleteResponse.data
    // return res.status(200).json({ status: 200, data: transaction });
  }  catch (error) {
		throw Object.assign({
			details: error.details ?? error.response.data.error.root_cause[0],
			status: error.status ?? error.response.data.status ?? error.response.status,
			message: ErrorCauses.TradeService['002'],
			service: 'TradeService',
			errorCode: '002',
		})
	}
}

module.exports = {
	buyPortfolio,
	sellPortfolio,
}
