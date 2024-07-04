// models/share.js
module.exports = (sequelize, DataTypes) => {
    const Share = sequelize.define('Share', {
      symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    });
  
    Share.associate = models => {
      Share.belongsToMany(models.Portfolio, { through: models.PortfolioShares });
    };
  
    return Share;
  };
  
  