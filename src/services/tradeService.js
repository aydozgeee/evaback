 
const { sequelize, User, Portfolio, Share, Transaction } = require('../models');
async function buyPortfolio (userId, portfolioId, symbol, quantity)  {
  try {
    // Kontroller
    const user = await User.findByPk(userId, { include: Portfolio });
    const portfolio = await Portfolio.findByPk(portfolioId, { include: Share });
    const share = await Share.findOne({ where: { symbol } });

    if (!user || !portfolio || !share) {
      return res.status(400).json({ error: 'Bad request: User, Portfolio, or Share not found.' });
    }

    // Son hisse fiyatını al
    const latestRate = share.rate;

    // Alım işlemi için yeni bir Transaction oluştur
    await Transaction.create({
      type: 'BUY',
      quantity,
      price: latestRate * quantity,
      timestamp: new Date(),
    });

    // Portföye hisse ekle
    await portfolio.addShare(share, { through: { quantity } });

    return res.status(200).json({ status: 200, data: transaction });
  } catch (error) {
    console.error('Error in buyShare:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
async function sellPortfolio(userId, portfolioId, symbol, quantity) {
  try {
    // Kontroller
    const user = await User.findByPk(userId, { include: Portfolio });
    const portfolio = await Portfolio.findByPk(portfolioId, { include: Share });
    const share = await Share.findOne({ where: { symbol } });

    if (!user || !portfolio || !share) {
      return { error: 'Bad request: User, Portfolio, or Share not found.' };
    }
    const latestRate = share.rate;
    const shareInPortfolio = portfolio.Shares.find(s => s.symbol === symbol);
    console.log("ddd",shareInPortfolio)
    if (!shareInPortfolio || shareInPortfolio.PortfolioShares.quantity < quantity) {
      return { error: 'Insufficient shares in the portfolio.' };
    }
  console.log(await Share.findAll())
     await Transaction.create({
      type: 'SELL',
      quantity,
      price: latestRate * quantity,
      timestamp: new Date(),
    });
    const deleteResponse=await portfolio.removeShare(share, { through: { quantity } });

    return deleteResponse.data
    // return res.status(200).json({ status: 200, data: transaction });
  } catch (error) {
    console.error('Error in sellShare:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

    

    module.exports = {
        buyPortfolio,
        sellPortfolio
   };