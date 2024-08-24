const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        checkoutSessionId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        products: {
            type: Array,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: "pending",
        },
        shippingAddress: {
            type: Object,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);
