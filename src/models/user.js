// models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    });
  
    User.associate = models => {
      User.hasOne(models.Portfolio, {
        foreignKey: 'UserId',
        allowNull: false,
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Transaction, {
        foreignKey: 'UserId',
        allowNull: false,
        onDelete: 'CASCADE'
      });
    };
  
    return User;
  };
  