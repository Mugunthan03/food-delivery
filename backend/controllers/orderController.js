const orderModel = require("../models/orderModel.js");
const userModel = require("../models/userModel.js");
const Stripe = require('stripe');
const dotenv = require('dotenv'); // Important to work with Stripe payment
dotenv.config(); // Important to work with Stripe payment

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place order from frontend
const placeOrder = async (req, res) => {

    const frontend_url = 'https://food-frontend-psi.vercel.app'; //fronend url  

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save(); // Save data in the database
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} }); // Clear the cart after payment

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: 30 * 100
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error processing the order' });
    }
};

// Verify order
const verifyOrder = async(req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: 'payment success' });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: 'payment failed' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

// User orders for frontend
const userOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

// List all the orders for admin panel
const listOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

// API for updating food status
const updateStatus = async(req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: 'Status updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

module.exports = { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
