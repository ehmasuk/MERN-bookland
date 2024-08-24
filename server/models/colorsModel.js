const mongoose = require("mongoose");

const colorsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        code : {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("colors", colorsSchema);
