const { getAllReviews, createReview, deleteReview, getReviewByProductId } = require('../controllers/reviewsControllers')


const router = require('express').Router()

router.get("/",getAllReviews)
router.get("/product/:id",getReviewByProductId)
router.post("/",createReview)
router.delete("/:id",deleteReview)



module.exports = router