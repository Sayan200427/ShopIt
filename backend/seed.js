require("dotenv").config();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./model/user");
const Product = require("./model/product");
const Order = require("./model/order");

const users = [
    {
        name: "Demo Admin",
        email: "admin@shopit.com",
        password: "Admin123!",
        role: "admin",
        verified: true
    },
    {
        name: "Rahul Sharma",
        email: "rahul@example.com",
        password: "User123!",
        role: "user",
        verified: true
    },
    {
        name: "Priya Das",
        email: "priya@example.com",
        password: "User123!",
        role: "user",
        verified: true
    }
];

const products = [
    {
        name: "Wireless Headphones",
        description: "Comfortable over-ear Bluetooth headphones with clear sound.",
        price: 2499,
        category: "Electronics",
        stock: 25,
        imageUrl: ["https://placehold.co/600x600?text=Wireless+Headphones"],
        ratings: 4.4,
        numReviews: 18
    },
    {
        name: "Smart Watch",
        description: "Fitness tracking smart watch with heart-rate monitoring.",
        price: 3999,
        category: "Electronics",
        stock: 16,
        imageUrl: ["https://placehold.co/600x600?text=Smart+Watch"],
        ratings: 4.2,
        numReviews: 11
    },
    {
        name: "Classic Cotton T-Shirt",
        description: "Soft everyday cotton T-shirt with a regular fit.",
        price: 699,
        category: "Fashion",
        stock: 60,
        imageUrl: ["https://placehold.co/600x600?text=Cotton+T-Shirt"],
        ratings: 4.1,
        numReviews: 27
    },
    {
        name: "Running Shoes",
        description: "Lightweight running shoes with a cushioned sole.",
        price: 2199,
        category: "Footwear",
        stock: 30,
        imageUrl: ["https://placehold.co/600x600?text=Running+Shoes"],
        ratings: 4.5,
        numReviews: 34
    },
    {
        name: "Stainless Steel Bottle",
        description: "Insulated one-litre bottle that keeps drinks cold or hot.",
        price: 899,
        category: "Home",
        stock: 42,
        imageUrl: ["https://placehold.co/600x600?text=Steel+Bottle"],
        ratings: 4.3,
        numReviews: 20
    },
    {
        name: "Laptop Backpack",
        description: "Water-resistant backpack with a padded laptop compartment.",
        price: 1499,
        category: "Accessories",
        stock: 22,
        imageUrl: ["https://placehold.co/600x600?text=Laptop+Backpack"],
        ratings: 4.6,
        numReviews: 15
    }
];

const seedDatabase = async () => {
    let connected = false;

    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing from .env");
        }

        await Promise.race([
            mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 }),
            new Promise((_, reject) => {
                setTimeout(() => reject(new Error("MongoDB connection timed out after 10 seconds")), 10000);
            })
        ]);
        connected = true;
        console.log("Connected to MongoDB");

        const seededUsers = [];
        for (const user of users) {
            const password = await bcrypt.hash(user.password, 10);
            const savedUser = await User.findOneAndUpdate(
                { email: user.email },
                { ...user, password },
                { upsert: true, new: true, runValidators: true }
            );
            seededUsers.push(savedUser);
        }

        const seededProducts = [];
        for (const product of products) {
            const savedProduct = await Product.findOneAndUpdate(
                { name: product.name },
                product,
                { upsert: true, new: true, runValidators: true }
            );
            seededProducts.push(savedProduct);
        }

        await Order.deleteMany({ paymentId: /^seed-payment-/ });
        await Order.insertMany([
            {
                user: seededUsers[1]._id,
                products: [
                    {
                        productId: seededProducts[0]._id,
                        quantity: 1,
                        price: seededProducts[0].price
                    },
                    {
                        productId: seededProducts[2]._id,
                        quantity: 2,
                        price: seededProducts[2].price
                    }
                ],
                totalAmount: seededProducts[0].price + (seededProducts[2].price * 2),
                address: {
                    fullName: "Rahul Sharma",
                    street: "12 Park Street",
                    city: "Kolkata",
                    postalCode: "700016",
                    state: "West Bengal",
                    country: "India"
                },
                paymentId: "seed-payment-001",
                status: "Delivered"
            },
            {
                user: seededUsers[2]._id,
                products: [
                    {
                        productId: seededProducts[3]._id,
                        quantity: 1,
                        price: seededProducts[3].price
                    }
                ],
                totalAmount: seededProducts[3].price,
                address: {
                    fullName: "Priya Das",
                    street: "44 Lake Road",
                    city: "Bengaluru",
                    postalCode: "560001",
                    state: "Karnataka",
                    country: "India"
                },
                paymentId: "seed-payment-002",
                status: "Processing"
            }
        ]);

        console.log(`Seeded ${seededUsers.length} users, ${seededProducts.length} products, and 2 orders`);
        console.log("Admin login: admin@shopit.com / Admin123!");
        console.log("User login: rahul@example.com / User123!");
    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exit(1);
    } finally {
        if (connected) {
            await mongoose.disconnect();
        }
    }
};

seedDatabase();
