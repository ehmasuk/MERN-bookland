const {stripePaymentController,paymentSuccess} = require("../controllers/stripePaymentController");

const router = require("express").Router();

router.post("/", stripePaymentController);
router.post("/success", paymentSuccess);

module.exports = router;
