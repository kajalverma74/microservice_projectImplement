const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AuthUser = sequelize.define(
    "AuthUser",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fullName: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        contactEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        hashedPassword: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: "auth_users", 
        timestamps: false,
    }
);

module.exports = AuthUser;
