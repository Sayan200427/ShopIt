const Order = require("../model/order.js");
const Product = require("../model/product.js");
const User = require("../model/user.js");

const getAdminStats = async (req , res) => {
    try {
        const totalUsers = await User.countDocuments({role : "user"});
        const totalOrders = await Order.countDocuments({});
        const totalProducts = await Product.countDocuments({});
        
        const orders = await Order.find({});

        const totalRevenuedata = orders.reduce((acc , order) => acc + order.totalAmount , 0);

        res.json({
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue: totalRevenuedata
        });
    }
    catch (error) {
        res.status(500).json({ message : "Server error!" });
    }
};

module.exports = { getAdminStats };