import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "../styles/product.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://vendra-ecommerce.onrender.com/api/products/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Product not found");
        }

        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1,
      })
    );

    alert("Successfully added to your cart!");
  };

  if (loading) {
    return (
      <div className="product-status loading">
        <div>
          <div className="loading-spinner"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-status error">
        <div>
          <h3>Product Not Found</h3>
          <Link to="/shop" className="back-to-shop">
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-wrapper">

      {/* Breadcrumb */}
      <div className="product-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>

        <Link to="/shop">Shop</Link>
        <span>/</span>

        <span>{product.category}</span>
        <span>/</span>

        <strong>{product.name}</strong>
      </div>

      {/* Product Detail */}
      <div className="product-detail">

        {/* Product Image */}
        <div className="detail-image-container">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="detail-image"
          />
        </div>

        {/* Product Information */}
        <div className="detail-info">

          <span className="product-detail-label">
            VENDRA COLLECTION
          </span>

          <h2>{product.name}</h2>

          <p className="detail-price">
            ₹{product.price.toFixed(2)}
          </p>

          <div className="detail-description">
            <h4>Product Description</h4>
            <p>{product.description}</p>
          </div>

          <button
            onClick={handleAddToCart}
            className="detail-cart-button"
          >
            Add to Shopping Cart
            <span> →</span>
          </button>

          <p
            className={`stock-status ${
              product.stock > 0 ? "in-stock" : "out-of-stock"
            }`}
          >
            {product.stock > 0
              ? `● In Stock (${product.stock} units available)`
              : "● Temporarily Out of Stock"}
          </p>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;