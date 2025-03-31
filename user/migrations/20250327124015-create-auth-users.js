module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.createTable("auth_users", {
          id: {
              type: Sequelize.INTEGER,
              autoIncrement: true,
              primaryKey: true,
              allowNull: false,
          },
          fullName: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          contactEmail: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true,
          },
          hashedPassword: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          status: {
              type: Sequelize.BOOLEAN,
              defaultValue: true,
          },
      });
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("auth_users");
  },
};
