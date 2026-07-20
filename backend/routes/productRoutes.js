const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const { getProducts , getProductById , createProduct , updateProduct , deleteProduct } = require("../controller/productController.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//all product routes
router.route("/").get(getProducts).post(protect , admin , upload.single("image") , createProduct);
//specific product routes
router.route("/:id").get(getProductById).put(protect , admin , upload.single("image") , updateProduct).delete(protect , admin , deleteProduct);


module.exports = router;
