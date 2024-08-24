const stripe = require("stripe")(process.env.STRIPE_SECRET);

const stripePaymentController = async (req, res) => {
    const { products, userId } = req.body;

    if (!products || !userId) {
        return res.status(404).json({ message: "products,userId required" });
    }

    const line_items = products.map((product) => {
        return {
            price_data: {
                currency: "usd",
                unit_amount: +product.price * 100,
                product_data: {
                    name: product.name,
                    images: [product.image],
                },
            },
            quantity: +product.quantity,
        };
    });

    const productsId = products.map((product) => {
        return product._id
    })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `http://localhost:5173/payment/success/{CHECKOUT_SESSION_ID}`,
        cancel_url: "http://localhost:5173/cancel",
        customer_email: "ehmasuk@gmail.com",
        line_items,
        metadata: {
            userId,
            products: JSON.stringify(productsId),
        },
    });

    return res.json(session);
};

const paymentSuccess = async(req, res) => {
    const { checkoutId } = req.body;

    try {
        const session = await stripe.checkout.sessions.retrieve(checkoutId);
        return res.json(session)
    } catch (error) {
        return res.status(404).json({ message: "Invalid session id" });
    }

    
};

module.exports = { stripePaymentController, paymentSuccess };
