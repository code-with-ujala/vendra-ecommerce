import React from "react";
import { Link } from "react-router-dom";
import "../styles/orderSuccess.css";

const OrderSuccess = () => {
  return (
    <div className="order-success-page">

      <div className="order-success-card">

        {/* Success Icon */}
        <div className="success-icon">
          ✓
        </div>

        <span className="success-label">
          ORDER CONFIRMED
        </span>

        <h2 className="order-success-title">
          Payment Successful!
        </h2>

        <p className="order-success-message">
          Thank you for shopping with Vendra. Your order has been
          successfully placed and we'll get it ready for you shortly.
        </p>

        <div className="order-success-info">
          <span>✓</span>
          <p>
            Your payment has been securely received.
          </p>
        </div>

        <Link
          to="/shop"
          className="order-success-btn"
        >
          Continue Shopping
          <span>→</span>
        </Link>

      </div>

    </div>
  );
};

export default OrderSuccess;