const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/db");

const Notification = sequelize.define("Notification", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { timestamps: true });

module.exports = Notification;
