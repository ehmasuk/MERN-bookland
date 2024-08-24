const reviewsModel = require("../models/reviewsModel");
const usersModel = require("../models/usersModel")
const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewsModel.find();

        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const getReviewByProductId = async (req, res) => {
    const id = req.params.id;
    try {
        const review = await reviewsModel.find({ productId: id });
        return res.status(200).json(review);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const createReview = async (req, res) => {
    const { userId, productId, review, rating } = req.body;

    if (!userId || !productId || !review || !rating) {
        return res.status(404).json({ message: "userId,productId,review,rating required" });
    }

    try {
        const user = await usersModel.findById(userId);

        if (user) {
            await reviewsModel.create({ user, productId, review, rating });
            return res.status(200).json({ message: "Review created successfully" });
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: error.message });
    }
};

const deleteReview = (req, res) => {};

module.exports = { getAllReviews, createReview, deleteReview, getReviewByProductId };
