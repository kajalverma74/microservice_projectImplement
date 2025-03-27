module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("categories", "image", {
      type: Sequelize.JSON, // Convert STRING to JSON
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("categories", "image", {
      type: Sequelize.STRING, // Reverse back to STRING if needed
      allowNull: true,
    });
  },
};
