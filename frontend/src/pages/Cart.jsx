import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, addToCart } from "../redux/cartSlice";
import "../styles/cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="cart-container">

      <div className="cart-header">
        <div>
          <span className="cart-label">YOUR BAG</span>
          <h2>Shopping Cart</h2>
          <p>Review your selected products before checkout.</p>
        </div>

        {cartItems.length > 0 && (
          <span className="cart-count">
            {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
          </span>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛍️</div>

          <h3>Your cart is empty</h3>

          <p>
            Looks like you haven't added anything to your cart yet.
          </p>

          <Link to="/shop" className="empty-cart-button">
            Start Shopping →
          </Link>
        </div>
      ) : (
        <div className="cart-layout">

          {/* Cart Items */}
          <div className="cart-items">

            {cartItems.map((item) => (
              <div key={item.productId} className="cart-item">

                <div className="cart-image-wrapper">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="cart-item-image"
                  />
                </div>

                <div className="cart-item-details">

                  <h4>{item.name}</h4>

                  <p className="cart-item-price">
                    ₹{item.price.toFixed(2)}
                  </p>

                  <div className="cart-item-bottom">

                    <div className="qty-controls">

                      <button
                        onClick={() =>
                          handleUpdateQty(item, item.qty - 1)
                        }
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <span>{item.qty}</span>

                      <button
                        onClick={() =>
                          handleUpdateQty(item, item.qty + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>

                    </div>

                    <button
                      onClick={() =>
                        handleRemove(item.productId)
                      }
                      className="btn-remove"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* Order Summary */}
          <div className="cart-summary">

            <span className="summary-label">
              ORDER SUMMARY
            </span>

            <h3>Order Total</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>₹{totalPrice.toFixed(2)}</strong>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-shipping">FREE</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{totalPrice.toFixed(2)}</strong>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="btn btn-checkout"
            >
              Proceed to Checkout
              <span> →</span>
            </button>

            <Link to="/shop" className="continue-shopping">
              ← Continue Shopping
            </Link>

          </div>

        </div>
      )}

    </div>
  );
};

export default Cart;