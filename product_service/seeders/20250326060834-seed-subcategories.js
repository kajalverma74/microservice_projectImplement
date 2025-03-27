'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('subcategories', [
      // Electronics
      { name: 'Mobile Phones', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Laptops', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cameras', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Smart Watches', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },

      // Fashion
      { name: 'Men’s Clothing', categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Women’s Clothing', categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Shoes', categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Accessories', categoryId: 2, createdAt: new Date(), updatedAt: new Date() },

      // Home & Furniture
      { name: 'Sofas', categoryId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Beds', categoryId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tables', categoryId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chairs', categoryId: 3, createdAt: new Date(), updatedAt: new Date() },

      // Books
      { name: 'Fiction', categoryId: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Non-Fiction', categoryId: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Comics', categoryId: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Children’s Books', categoryId: 4, createdAt: new Date(), updatedAt: new Date() },

      // Sports & Fitness
      { name: 'Cricket', categoryId: 5, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Football', categoryId: 5, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Gym Equipment', categoryId: 5, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Outdoor Games', categoryId: 5, createdAt: new Date(), updatedAt: new Date() },

      // Beauty & Personal Care
      { name: 'Skincare', categoryId: 6, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Haircare', categoryId: 6, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Makeup', categoryId: 6, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Fragrances', categoryId: 6, createdAt: new Date(), updatedAt: new Date() },

      // Toys & Games
      { name: 'Action Figures', categoryId: 7, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Board Games', categoryId: 7, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Puzzles', categoryId: 7, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Outdoor Toys', categoryId: 7, createdAt: new Date(), updatedAt: new Date() },

      // Automotive
      { name: 'Car Accessories', categoryId: 8, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bike Accessories', categoryId: 8, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Spare Parts', categoryId: 8, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lubricants', categoryId: 8, createdAt: new Date(), updatedAt: new Date() },

      // Grocery
      { name: 'Vegetables', categoryId: 9, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Fruits', categoryId: 9, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Dairy Products', categoryId: 9, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Snacks', categoryId: 9, createdAt: new Date(), updatedAt: new Date() },

      // Health & Wellness
      { name: 'Supplements', categoryId: 10, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Medical Devices', categoryId: 10, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Personal Hygiene', categoryId: 10, createdAt: new Date(), updatedAt: new Date() },
      { name: 'First Aid', categoryId: 10, createdAt: new Date(), updatedAt: new Date() },
      
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('subcategories', null, {});
  },
};
