require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const users = require("./routes/users");
const auth = require("./routes/auth");
const products = require("./routes/products");
const category = require("./routes/category");
const paymentRoute = require("./routes/paymentRoute");
const colors = require("./routes/colors");
const orderRoute = require("./routes/orderRoute");
const reviewsRoute = require("./routes/reviewsRoute");

const cookieParser = require("cookie-parser");
const connectDb = require("./middlewares/connectDb");

// data connection
connectDb();

// run server
app.listen(8080, () => {
    console.log("Serevr Running on http://localhost:8080");
});

// middlewares
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(express.json({ extended: true, limit: "200mb" }));
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
app.use(cookieParser());

// routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/products", products);
app.use("/api/category", category);
app.use("/api/color", colors);
app.use("/api/reviews", reviewsRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/order", orderRoute);

// invalid route
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});
