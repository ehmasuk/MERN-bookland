const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema(
    {
        user: { type: Object, required: true },
        productId: { type: String, required: true },
        review: { type: String, required: true },
        rating: { type: String, required: true },
        replies: { type: Array, default: [] },
    },
    { timestamps: true }
);

module.exports = mongoose.model("reviews", reviewsSchema);
