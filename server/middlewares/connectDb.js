const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, { dbName: process.env.DB_NAME });
        console.log("Database connection established");
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = connectDatabase;
