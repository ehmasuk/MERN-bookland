const {getAllProducts,createProduct,deleteProduct,getSingleProduct} = require('../controllers/products')

const router = require('express').Router()

router.get("/",getAllProducts)
router.get("/:id",getSingleProduct)
router.post("/",createProduct)
router.delete("/:id",deleteProduct)



module.exports = router