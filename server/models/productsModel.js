const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        categories: { type: Array, default: [] },
        colors: { type: Array, default: [] },
        price: { type: String, required: true },
        oldPrice: { type: String, default: null },
        author: { type: String, required: true },
        publisher: { type: String, default: null },
        language: { type: String, default: "English" },
        image: { type: String, require: true },
        slug: { type: String, require: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("products", productsSchema);
