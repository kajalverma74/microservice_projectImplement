const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('user_microservice', 'admin', 'root', {
    host: 'localhost',
    dialect: 'mysql',  
    logging: false,    
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('MYSQL Database connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;