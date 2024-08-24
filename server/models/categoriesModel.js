const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug : {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("categories", categoriesSchema);
