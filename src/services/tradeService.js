const { User, Portfolio, Share, Transaction } = require('../models');

async function buyPortfolio(userId, portfolioId, symbol, quantity) {
  try {
    const user = await User.findByPk(userId, { include: Portfolio });
    if (!user) {
      return { error: 'Bad request: User not found.' };
    }

    const portfolio = user.Portfolios.find((p) => p.id === portfolioId);
    if (!portfolio) {
      return { error: 'Bad request: Portfolio not found or does not belong to the user.' };
    }

    const share = await Share.findOne({ where: { symbol } });
    if (!share) {
      return { error: 'Bad request: Share not found.' };
    }

    const latestRate = share.rate;
    const shareInPortfolio = portfolio.Shares.find((s) => s.symbol === symbol);

    if (!shareInPortfolio) {
      await portfolio.addShare(share, { through: { quantity } });
    } else {
      shareInPortfolio.PortfolioShares.quantity += quantity;
      await shareInPortfolio.PortfolioShares.save();
    }

    await Transaction.create({
      type: 'BUY',
      quantity,
      price: latestRate * quantity,
      timestamp: new Date(),
    });

    return { status: 'success', message: 'Shares bought successfully' };
  } catch (error) {
    console.error('Error in buyShare:', error);
    return { error: 'Internal server error' };
  }
}

async function sellPortfolio(userId, portfolioId, symbol, quantity) {
  try {
    const user = await User.findByPk(userId, { include: Portfolio });
    if (!user) {
      return { error: 'Bad request: User not found.' };
    }

    const portfolio = user.Portfolios.find((p) => p.id === portfolioId);
    if (!portfolio) {
      return { error: 'Bad request: Portfolio not found or does not belong to the user.' };
    }

    const share = await Share.findOne({ where: { symbol } });
    if (!share) {
      return { error: 'Bad request: Share not found.' };
    }

    const latestRate = share.rate;
    const shareInPortfolio = portfolio.Shares.find((s) => s.symbol === symbol);

    if (!shareInPortfolio || shareInPortfolio.PortfolioShares.quantity < quantity) {
      return { error: 'Insufficient shares in the portfolio.' };
    }

    await Transaction.create({
      type: 'SELL',
      quantity,
      price: latestRate * quantity,
      timestamp: new Date(),
    });

    shareInPortfolio.PortfolioShares.quantity -= quantity;
    if (shareInPortfolio.PortfolioShares.quantity === 0) {
      await portfolio.removeShare(share);
    } else {
      await shareInPortfolio.PortfolioShares.save();
    }

    return { status: 'success', message: 'Shares sold successfully' };
  } catch (error) {
    console.error('Error in sellShare:', error);
    return { error: 'Internal server error' };
  }
}

module.exports = {
  buyPortfolio,
  sellPortfolio,
};
