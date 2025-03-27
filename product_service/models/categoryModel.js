const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Category = sequelize.define(
  "Category",
  {
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
    image: {  // Multiple images JSON format me store karne ke liye
        type: DataTypes.JSON,
        allowNull: true,
    },
  },
  {
    tableName: "categories",
    timestamps: true,
  }
);

module.exports = Category;
