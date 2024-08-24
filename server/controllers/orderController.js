const orderModel = require("../models/orderModel");

const createOrder = async (req, res) => {
    const { checkoutSessionId, userId, products, total, shippingAddress } = req.body;

    if (!checkoutSessionId || !userId || !products || !total || !shippingAddress) {
        return res.status(404).json({ message: "checkoutSessionId,userId,products,total,shippingAddress required" });
    }

    const alreadyExist = await orderModel.findOne({ checkoutSessionId });

    if (alreadyExist) {
        return res.status(404).json({ message: "Order already submitted" });
    }

    try {
        await orderModel.create({ checkoutSessionId, userId, products, total, shippingAddress });
        return res.status(202).json({ message: "Order created successfully" });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await orderModel.find();
        return res.status(202).json(orders);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

module.exports = { createOrder, getOrders };
