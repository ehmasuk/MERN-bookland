const { createOrder,getOrders } = require('../controllers/orderController')

const router = require('express').Router()

router.get("/",getOrders)
router.post("/",createOrder)

module.exports = router