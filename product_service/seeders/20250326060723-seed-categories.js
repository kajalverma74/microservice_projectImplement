'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [
      { id: 1, name: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Fashion', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Home & Furniture', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Books', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Sports & Fitness', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: 'Beauty & Personal Care', createdAt: new Date(), updatedAt: new Date() },
      { id: 7, name: 'Toys & Games', createdAt: new Date(), updatedAt: new Date() },
      { id: 8, name: 'Automotive', createdAt: new Date(), updatedAt: new Date() },
      { id: 9, name: 'Grocery', createdAt: new Date(), updatedAt: new Date() },
      { id: 10, name: 'Health & Wellness', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
