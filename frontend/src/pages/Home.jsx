import React , {useEffect , useState} from "react";
import ProductCard from "../components/ProductCard";


const Home = () => {

    const [products , setProducts] = useState([]);
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                const data = await response.json();
                setProducts(data.slice(0, 4)); // Display only the first 4 products
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);


    return (
        <div className="home-container">
            <div className="hero-banner">
                <h1>Welcome to ShopIt</h1>
                <p>Your one-stop shop for all your needs!</p>
            </div>
            {loading ? (
                <p>Loading products...</p>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
