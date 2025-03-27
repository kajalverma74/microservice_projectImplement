const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
// const Category = require('./categoryModel'); // ✅ Import Category model

const Subcategory = sequelize.define('Subcategory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories', 
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
}, {
    tableName: 'subcategories',  
    timestamps: true,
});

module.exports = Subcategory;
