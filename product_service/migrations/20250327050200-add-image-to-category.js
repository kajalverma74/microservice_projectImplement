module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("categories", "image", {
      type: Sequelize.STRING,
      allowNull: true, // Optional field
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("categories", "image");
  },
};
