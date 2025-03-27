const { DataTypes } = require('sequelize');
const sequelize  = require('../config/database');
// const User = require('./userModel');

const Customer = sequelize.define('Customer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users", 
            key: 'id',
        },
    },
}, {
    tableName: 'customers',
    timestamps: true,
});

module.exports = Customer;