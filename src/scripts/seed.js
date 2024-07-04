// src/scripts/seed.js
const { sequelize, User, Portfolio, Share, Transaction,PortfolioShares } = require('../models');

async function seedDatabase() {
  try {
    // await sequelize.sync();

    // const user1 = await User.create({ username: 'user1' });
    // const user2 = await User.create({ username: 'user2' });

    // // Create Portfolios for Users
    // const portfolio1 = await Portfolio.create({ name: 'portfolio1', UserId: user1.id });
    // const portfolio2 = await Portfolio.create({ name: 'portfolio2', UserId: user2.id });

    // // Create Shares
    // const share1 = await Share.create({ symbol: 'ABC', name: 'Company ABC', rate: 11.00 });
    // const share2 = await Share.create({ symbol: 'XYZ', name: 'Company XYZ', rate: 15.50 });

    // // Add Shares to Portfolios
    // await portfolio1.addShare(share1, { through: { quantity: 100 } });
    // await portfolio1.addShare(share2, { through: { quantity: 50 } });
    // await portfolio2.addShare(share1, { through: { quantity: 80 } });

    // // Create Transactions
    // await Transaction.bulkCreate([
    //   { type: 'BUY', quantity: 10, price: 100.00, UserId: user1.id, ShareId: share1.id },
    //   { type: 'SELL', quantity: 5, price: 50.00, UserId: user1.id, ShareId: share2.id },
    //   { type: 'BUY', quantity: 20, price: 220.00, UserId: user2.id, ShareId: share1.id },
    //   { type: 'SELL', quantity: 15, price: 200.00, UserId: user2.id, ShareId: share2.id }
    // ]);

    const users = await User.findAll();
    const portfolios = await Portfolio.findAll();
    const shares = await Share.findAll();
    const transactions = await Transaction.findAll();
    const portfolioShares = await PortfolioShares.findAll();
    console.log('Users:', JSON.stringify(users, null, 2));
    console.log('Portfolios:', JSON.stringify(portfolios, null, 2));
    console.log('Shares:', JSON.stringify(shares, null, 2));
    console.log('Transactions:', JSON.stringify(transactions, null, 2));
    console.log('portfolioShares:', JSON.stringify(portfolioShares, null, 2));

    console.log('Database & tables synced and seeded!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

module.exports = { seedDatabase };
