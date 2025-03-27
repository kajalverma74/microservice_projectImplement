const express = require("express");
const router = express.Router();

const { addSubcategory } = require("../controllers/subcategoriesControllers");

// Route to add a new subcategory
router.post("/addSubcategory", addSubcategory);

module.exports = router;
