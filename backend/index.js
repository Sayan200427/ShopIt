const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();




const app = express();
app.use(cors(
    {
        origin: [ "http://localhost:3000", "http://localhost:5000" ],
        methods: ["GET" , "POST" , "PUT" , "DELETE"],
        allowedHeaders: ["Content-Type" , "Authorization"]
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/" , (req , res ) => {
    res.send("ShopIt Backend is working properly!");
});

app.use("/api/auth" , require("./routes/authRoutes"));
app.use("/api/products" , require("./routes/productRoutes.js"));
app.use("/api/orders" , require("./routes/orderRoutes.js"));
app.use("/api/payment" , require("./routes/paymentRoutes"));
app.use("/api/analytics" , require("./routes/analyticsRoutes"));


const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT , () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
