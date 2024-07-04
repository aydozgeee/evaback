module.exports = (sequelize, DataTypes) => {
  const Portfolio = sequelize.define('Portfolio', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Portfolio.associate = models => {
    Portfolio.belongsTo(models.User);
    Portfolio.belongsToMany(models.Share, { through: models.PortfolioShares });
  };

  return Portfolio;
};
