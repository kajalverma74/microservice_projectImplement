const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('notification_Service', 'admin', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // Disable logging; set to true for debugging
});

// Function to connect to the database
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        process.exit(1); // Stop application if DB connection fails
    }
};

module.exports = { sequelize, connectDB };
