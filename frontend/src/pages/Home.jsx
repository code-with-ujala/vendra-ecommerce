import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/home.css";
import heroImage from "../assets/vendra-hero.png";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-container">

      {/* ================= HERO ================= */}

      <section className="hero-banner">

        {/* LEFT CONTENT */}

        <div className="hero-content">

          <span className="hero-badge">
            ✨ Curated finds, made for you
          </span>

          <h1>
            Find what you love,
            <span> Vendra it.</span>
          </h1>

          <p>
            Discover stylish products, trusted quality, and effortless
            shopping — all in one beautiful place.
          </p>

          <div className="hero-actions">

            <a href="/shop" className="btn hero-primary-btn">
              Shop Now
              <span>→</span>
            </a>

            <a href="#featured" className="hero-secondary-btn">
              Explore Collection
              <span>↓</span>
            </a>

          </div>

          {/* HERO STATS */}

          <div className="hero-stats">

            <div className="hero-stat">
              <strong>10K+</strong>
              <span>Happy Customers</span>
            </div>

            <div className="hero-stat">
              <strong>500+</strong>
              <span>Products</span>
            </div>

            <div className="hero-stat">
              <strong>4.8★</strong>
              <span>Customer Rating</span>
            </div>

          </div>

        </div>


        {/* RIGHT HERO VISUAL */}

        <div className="hero-visual">

          <div className="hero-glow"></div>

          <div className="hero-circle hero-circle-one"></div>
          <div className="hero-circle hero-circle-two"></div>

          <div className="hero-image-wrapper">
            <img
              src={heroImage}
              alt="Vendra shopping collection"
              className="hero-image"
            />
          </div>

          {/* FLOATING CARD */}

          <div className="hero-floating-card">

            <span>✨ Vendra Pick</span>

            <strong>Trending finds</strong>

            <small>Loved by shoppers</small>

          </div>

          {/* FLOATING HEART */}

          <div className="hero-floating-bubble bubble-one">
            ♡
          </div>

          {/* FLOATING STAR */}

          <div className="hero-floating-bubble bubble-two">
            ✦
          </div>

        </div>

      </section>


      {/* ================= FEATURED PRODUCTS ================= */}

      <section
        className="featured-section"
        id="featured"
      >

        <div className="section-heading">

          <div className="section-heading-text">

            <span className="section-label">
              CURATED FOR YOU
            </span>

            <h2>
              Featured Products
            </h2>

            <p>
              Explore some of our most-loved products.
            </p>

          </div>

          <a
            href="/shop"
            className="view-all-link"
          >
            View all
            <span>→</span>
          </a>

        </div>


        {/* LOADING */}

        {loading ? (

          <div className="products-loading">

            <div className="loading-spinner"></div>

            <p>
              Finding something special for you...
            </p>

          </div>

        ) : products.length === 0 ? (

          /* EMPTY STATE */

          <div className="empty-products">

            <div className="empty-icon">
              🛍️
            </div>

            <h3>
              No products available
            </h3>

            <p>
              Check back soon for exciting new products.
            </p>

          </div>

        ) : (

          /* PRODUCTS */

          <div className="product-grid">

            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>

        )}

      </section>


      {/* ================= WHY VENDRA ================= */}

      <section className="home-benefits">

        <div className="benefit-item">

          <div className="benefit-icon">
            ✦
          </div>

          <div>
            <h3>
              Curated Products
            </h3>

            <p>
              Quality picks made for modern living.
            </p>
          </div>

        </div>


        <div className="benefit-item">

          <div className="benefit-icon teal">
            ✓
          </div>

          <div>
            <h3>
              Easy Shopping
            </h3>

            <p>
              A simple and effortless experience.
            </p>
          </div>

        </div>


        <div className="benefit-item">

          <div className="benefit-icon pink">
            ♡
          </div>

          <div>
            <h3>
              Made for You
            </h3>

            <p>
              Discover products you'll love.
            </p>
          </div>

        </div>

      </section>


      {/* ================= FINAL CTA ================= */}

      <section className="home-cta">

        <div className="home-cta-content">

          <span className="cta-label">
            ✨ YOUR NEXT FAVORITE FIND
          </span>

          <h2>
            Ready to discover
            <span> something new?</span>
          </h2>

          <p>
            Explore our collection and find products
            that fit your style, needs, and everyday life.
          </p>

          <a
            href="/shop"
            className="btn cta-button"
          >
            Start Shopping
            <span>→</span>
          </a>

        </div>

      </section>

    </div>
  );
};

export default Home;