const { getAllCategories, createCategory, deleteCategory } = require("../controllers/category");

const router = require("express").Router();

router.get("/", getAllCategories);
router.post("/", createCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
