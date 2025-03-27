const Category = require("./categoryModel");
const Subcategory = require("./subcategoryModel");

// Define associations
Category.hasMany(Subcategory, {
  foreignKey: "categoryId",
  as: "subcategories",
});

Subcategory.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

module.exports = { Category, Subcategory };
