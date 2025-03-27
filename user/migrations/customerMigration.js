module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('customers', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users', 
            key: 'id',
          },
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
    },
    async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('customers');
    }
  };
  