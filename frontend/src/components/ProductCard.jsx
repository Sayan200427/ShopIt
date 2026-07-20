import React from "react";
import {Link} from "react-router-dom";
import "../styles/Product.css";

const ProductCard = ({ product }) => {
    const imageSrc = Array.isArray(product.imageUrl) ? product.imageUrl[0] : product.imageUrl;

    return (
        <div className="product-card">
            <img src={imageSrc} alt={product.name} className="product-image" />
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">Rs. {product.price}</p>
                <Link to={`/products/${product._id}`} className="btn btn-primary">
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;
