const { getAllColors, createColor, deleteColor } = require("../controllers/colors");


const router = require("express").Router();

router.get("/", getAllColors);
router.post("/", createColor);
router.delete("/:id", deleteColor);

module.exports = router;
