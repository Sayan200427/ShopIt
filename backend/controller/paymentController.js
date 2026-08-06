const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const createOrder = async (req , res) => {
    try {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return res.status(500).json({ message: "Razorpay keys are missing" });
        }

        const amount = Number(req.body.amount);
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid payment amount" });
        }

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        const options = {
            amount: Math.round(amount * 100), // amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };
        const order = await instance.orders.create(options);
        res.status(201).json({
            ...order,
            key: process.env.RAZORPAY_KEY_ID
        });
    }
    catch (error) {
        res.status(500).json({ message : error.message || "Server error!" });
    }
};




const verifyPayment = async (req , res) => {
    try {
        if (!process.env.RAZORPAY_KEY_SECRET) {
            return res.status(500).json({ message: "Razorpay secret is missing" });
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');
            if (generated_signature === razorpay_signature) {
                
                res.status(200).json({ message: "Payment verified successfully!" });
            } else {
                res.status(400).json({ message: "Payment verification failed!" });
            }
    } catch (error) {

        res.status(500).json({ message : "Server error!" });
    }   
};

module.exports = { createOrder, verifyPayment };
