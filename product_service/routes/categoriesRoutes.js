const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");

const {
  getCategories,
  getCategoriesWithSubcategoriesByIds,
  getSubcategoriesWithCategories,
  createCategory,
  getImages,
  updateCategoryImages,
  deleteCategory,
} = require("../controllers/categoriesControllers");

router.post("/categories", upload.single("image"), createCategory); // Upload single image

router.get("/categories", getCategories);

router.get("/categories/images", getImages);

router.delete("/categories/:id", deleteCategory);

router.put("/categories/:id", upload.array("image", 5), updateCategoryImages);

router.post("/categories-by-subcate", getCategoriesWithSubcategoriesByIds);

router.post("/subcategories-with-categories", getSubcategoriesWithCategories);

module.exports = router;
