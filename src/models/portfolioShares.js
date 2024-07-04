// models/portfolioshares.js
module.exports = (sequelize, DataTypes) => {
    const PortfolioShares = sequelize.define('PortfolioShares', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    
    return PortfolioShares;
};
