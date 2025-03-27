const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
    product: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'orders',
    timestamps: true,
});

module.exports = Order;
