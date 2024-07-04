// models/transaction.js
module.exports = (sequelize, DataTypes) => {
	const Transaction = sequelize.define('Transaction', {
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		timestamp: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	})

	Transaction.associate = (models) => {
		Transaction.belongsTo(models.User, {
			foreignKey: 'UserId',
			allowNull: false,
			onDelete: 'CASCADE',
		})
		Transaction.belongsTo(models.Share, {
			foreignKey: 'ShareId',
			allowNull: false,
			onDelete: 'CASCADE',
		})
	}

	return Transaction
}
