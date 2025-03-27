const { Category, Subcategory } = require("../models/association");

const fs = require("fs");
const path = require("path");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ["id", "name"],
    });

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getCategoriesWithSubcategoriesByIds = async (req, res) => {
  try {
    const { categoriesIds } = req.body;

    if (
      !categoriesIds ||
      !Array.isArray(categoriesIds) ||
      categoriesIds.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid array of category IDs.",
      });
    }

    const categories = await Category.findAll({
      where: { id: categoriesIds }, // Filter by category IDs
      include: [
        {
          model: Subcategory,
          as: "subcategories",
          attributes: ["id", "name"],
        },
      ],
      attributes: ["id", "name"],
    });

    if (!categories.length) {
      return res.status(404).json({
        success: false,
        message: "No categories found.",
      });
    }

    // Transform response to show subcategories as an object
    const formattedData = categories.map((category) => {
      const subcategoriesObject = {};
      category.subcategories.forEach((subcategory) => {
        subcategoriesObject[subcategory.id] = subcategory.name;
      });

      return {
        id: category.id,
        name: category.name,
        subcategories: subcategoriesObject,
      };
    });

    return res.status(200).json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getSubcategoriesWithCategories = async (req, res) => {
  try {
    const { subcategoryIds } = req.body;

    if (
      !subcategoryIds ||
      !Array.isArray(subcategoryIds) ||
      subcategoryIds.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid array of subcategory IDs.",
      });
    }

    const subcategories = await Subcategory.findAll({
      where: { id: subcategoryIds },
      attributes: ["id", "name"],
    });

    if (subcategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No subcategories found for the given IDs",
        data: null,
      });
    }

    const categories = await Category.findAll({
      attributes: ["id", "name"],
    });

    const responseData = subcategories.map((subcategory) => ({
      subcategoryId: subcategory.id,
      name: subcategory.name,
      categories: categories.map((category) => ({
        categoryId: category.id,
        title: category.name,
      })),
    }));

    return res.status(200).json({
      success: true,
      message: "Subcategories with all categories fetched successfully.",
      data: responseData,
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Public URL

    const category = await Category.create({
      name,
      image,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getImages = async (req, res) => {
  try {
    const categories = await Category.findAll();

    const responseData = categories.map((category) => ({
      id: category.id,
      name: category.name,
      image: category.image ? `http://localhost:5000${category.image}` : null, // Full URL
    }));

    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: responseData,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateCategoryImages = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No images uploaded" });
    }

    // **Full image URLs generate karna**
    const imagePaths = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    // **Category update karna (JSON format me store)**
    await Category.update(
      { image: JSON.stringify(imagePaths) },
      { where: { id } }
    );

    // **Updated category ka naam fetch karna**
    const updatedCategory = await Category.findOne({ where: { id } });

    return res.json({
      success: true,
      message: "Category images updated successfully",
      categoryName: updatedCategory ? updatedCategory.name : "Unknown",
      images: imagePaths,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    //  Pehle category ko find karo (delete hone se pehle naam store karna hai)
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const categoryName = category.name; //  Save name before deleting

    // Delete associated images if exist
    if (category.image) {
      let imagePaths = [];

      try {
        imagePaths = JSON.parse(category.image);
        if (!Array.isArray(imagePaths)) throw new Error("Not an array");
      } catch (err) {
        imagePaths = category.image.includes(",") ? category.image.split(",") : [category.image];
      }

      imagePaths.forEach((filePath) => {
        const fileName = filePath.split("/").pop();
        const fullPath = path.join(__dirname, "..", "uploads", fileName);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      });
    }
    // Category ko delete karo
    await Category.destroy({ where: { id } });

    // Response me delete hone wali category ka naam send karo
    return res.json({
      success: true,
      message: `Category '${categoryName}' deleted successfully`,
      categoryName: categoryName,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getCategories,
  getCategoriesWithSubcategoriesByIds,
  getSubcategoriesWithCategories,
  createCategory,
  getImages,
  updateCategoryImages,
  deleteCategory,
};
