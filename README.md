# 🛒 ShopIt – Full-Stack MERN E-Commerce Application

ShopIt is a modern **full-stack e-commerce web application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. It provides a complete online shopping experience with user authentication, product browsing, shopping cart management, secure checkout, and an admin dashboard for managing products and orders.

---

## 🚀 Features

### 👤 User Features

- User Registration & Login
- JWT Authentication
- Browse Products
- Search & Filter Products
- Product Details Page
- Add to Cart
- Update Cart Quantity
- Remove Items from Cart
- Shipping Information
- Order Placement
- Order History
- User Profile Management
- Responsive Design

---

### 🛍️ Product Features

- Product Listing
- Product Categories
- Product Search
- Product Filtering
- Product Images
- Product Ratings & Reviews
- Stock Management

---

### 💳 Checkout Features

- Secure Checkout Process
- Shipping Address Management
- Order Summary
- Payment Integration (if configured)
- Order Confirmation

---

### 🔐 Admin Features

- Admin Dashboard
- Manage Products
- Add New Products
- Update Products
- Delete Products
- Manage Users
- View Orders
- Update Order Status
- Dashboard Statistics

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Redux Toolkit / Redux
- Axios
- Bootstrap / CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JSON Web Token (JWT)
- bcrypt.js

### Other Tools

- Cloudinary (Image Storage)
- Multer
- Concurrently
- dotenv

---

## 📂 Project Structure

```
ShopIt/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── seed/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── hooks/
│   │   └── App.js
│
├── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ShopIt.git
cd ShopIt
```

### 2. Install Dependencies

Install all frontend and backend dependencies:

```bash
npm run install-all
```

or install manually:

```bash
npm install

cd backend
npm install

cd ../frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## ▶️ Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

---

## 🌱 Seed Database

Populate the database with sample data:

```bash
npm run seed
```

---

## 📸 Screenshots

Create an `images/` folder and add screenshots.

```markdown
![Home](images/home.png)

![Product](images/product.png)

![Cart](images/cart.png)

![Admin Dashboard](images/admin-dashboard.png)
```

---

## 📡 API Overview

### Authentication

- Register User
- Login User
- Logout User

### Products

- Get All Products
- Get Product Details
- Create Product
- Update Product
- Delete Product

### Orders

- Create Order
- Get User Orders
- Get Order Details
- Update Order Status

### Users

- Get Profile
- Update Profile
- Manage Users (Admin)

---

## 🔒 Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Authorization
- Environment Variables
- Secure API Endpoints

---

## 🎯 Future Improvements

- Wishlist
- Product Recommendations
- Coupons & Discounts
- Email Notifications
- Live Order Tracking
- Multi-language Support
- Dark Mode
- PWA Support
- AI-powered Product Suggestions

---

## 🤝 Contributing

Contributions are welcome!

1. Fork this repository

2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push the branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Sayan Biswas**

- GitHub: https://github.com/Sayan200427
- LinkedIn: https://www.linkedin.com/in/your-linkedin-profile

---

## ⭐ Support

If you found this project useful, please consider giving it a **⭐ Star** on GitHub.

Happy Coding! 🚀
