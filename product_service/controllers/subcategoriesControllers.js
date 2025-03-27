const { Subcategory, Category } = require("../models/association");

const addSubcategory = async (req, res) => {
    try {
        const { name, categoryId } = req.body;

        if (!name || !categoryId) {
            return res.status(400).json({
                success: false,
                message: "Subcategory name and category ID are required.",
            });
        }
        // Check if the category exists
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });
        }
        // Create the subcategory
        const subcategory = await Subcategory.create({
            name,
            categoryId,
        });

        return res.status(201).json({
            success: true,
            message: "Subcategory created successfully.",
            data: subcategory,
        });
    } catch (error) {
        console.error("Error adding subcategory:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    addSubcategory,
};