const Order = require("../model/order.js");

const sendEmail = require("../utils/sendEmail.js");


//craete new order
const createOrder = async (req , res) => {
    
    try {
        const { item, totalAmount, address, paymentId } = req.body;
        if (!Array.isArray(item) || item.length === 0 || totalAmount == null || !address || !paymentId) {
            return res.status(400).json({ message : "Please provide all required fields!" });
        }
        else{
            const order = new Order({
                user: req.user._id,
                products: item,
                totalAmount,
                address,
                paymentId
            });
            await order.save();
            const message = `Dear ${req.user.name},\n\nThank you for your order! Your order has been successfully placed.\n\nOrder Details:\nOrder ID: ${order._id}\nTotal Amount: $${order.totalAmount}\n\nWe will notify you once your order is shipped.\n\nThank you for shopping with us!\n\nBest regards,\nShopIt Team`;

            try {
                await sendEmail(req.user.email, "Order Confirmation", message);
            } catch (emailError) {
                console.error("Order saved, but confirmation email failed:", emailError.message);
            }

            res.status(201).json({ message: "Order created successfully!", order });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: process.env.NODE_ENV === "production" ? undefined : error.message
        });
    }
};


const myOrders = async (req , res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate("products.productId" , "name price");
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message : "Server error!" });
    }
};




const getOrders = async (req , res) => {
    try {
        const orders = await Order.find({}).populate("user" , "name");
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message : "Server error!" });
    }
};

const updateOrderStatus = async (req , res) => {
    try {
        const { status } = req.body;
        const orderToUpdate = await Order.findById(req.params.id);
        if(orderToUpdate) {
            orderToUpdate.status = status;
            await orderToUpdate.save();
            res.json({ message : "Order status updated successfully!" });
        }
        else {
            res.status(404).json({ message : "Order not found!" });
        }
    }
    catch (error) {
        res.status(500).json({ message : "Server error!" });
    }
};

module.exports = { createOrder , myOrders , getOrders , updateOrderStatus };
