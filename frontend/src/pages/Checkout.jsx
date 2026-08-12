import React, {
  useState,
  useContext,
  useEffect,
} from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { clearCart } from "../redux/cartSlice";

import "../styles/checkout.css";

const Checkout = () => {
  const { user } = useContext(AuthContext);

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "India",
  });

  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState("");

  /* ==========================
     LOAD RAZORPAY
  ========================== */

  useEffect(() => {
    const scriptId = "razorpay-checkout-script";

    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement("script");

    script.id = scriptId;
    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    document.body.appendChild(script);

    return () => {
      // Keep Razorpay script available
    };
  }, []);

  /* ==========================
     TOTAL
  ========================== */

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.qty || 0),
    0
  );

  /* ==========================
     ADDRESS CHANGE
  ========================== */

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  /* ==========================
     PAYMENT
  ========================== */

  const handlePayment = async () => {
    setError("");

    if (!user) {
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      navigate("/shop");
      return;
    }

    /* ==========================
       CHECK ADDRESS
    ========================== */

    const {
      fullName,
      street,
      city,
      postalCode,
      country,
    } = address;

    if (
      !fullName.trim() ||
      !street.trim() ||
      !city.trim() ||
      !postalCode.trim() ||
      !country.trim()
    ) {
      setError(
        "Please complete your shipping address."
      );

      return;
    }

    /* ==========================
       CHECK RAZORPAY
    ========================== */

    if (!window.Razorpay) {
      setError(
        "Razorpay is still loading. Please try again in a moment."
      );

      return;
    }

    /* ==========================
       CHECK RAZORPAY KEY
    ========================== */

    const razorpayKey =
      import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (!razorpayKey) {
      setError(
        "Razorpay Test Key is missing. Check your frontend .env file."
      );

      return;
    }

    try {
      setPaymentLoading(true);

      /* ==========================
         CREATE RAZORPAY ORDER
      ========================== */

      const orderRes = await fetch(
        "https://vendra-ecommerce.onrender.com/api/payment/order",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization:
              `Bearer ${user.token}`,
          },

          body: JSON.stringify({
            amount: totalPrice,
          }),
        }
      );

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(
          orderData.message ||
            "Unable to create payment order."
        );
      }

      /* ==========================
         RAZORPAY OPTIONS
      ========================== */

      const options = {
        key: razorpayKey,

        amount: orderData.amount,

        currency:
          orderData.currency || "INR",

        name: "Vendra",

        description:
          "Vendra Order Payment",

        order_id: orderData.id,

        prefill: {
          name: address.fullName,
          email: user.email || "",
          contact: "",
        },

        notes: {
          shipping_address:
            `${address.street}, ${address.city}, ${address.postalCode}, ${address.country}`,
        },

        theme: {
          color: "#FF6B35",
        },

        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
          },
        },

        /* ==========================
           PAYMENT SUCCESS
        ========================== */

        handler: async (response) => {
          try {
            /* ==========================
               VERIFY PAYMENT
            ========================== */

            const verifyRes = await fetch(
              "https://vendra-ecommerce.onrender.com/api/payment/verify",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",

                  Authorization:
                    `Bearer ${user.token}`,
                },

                body: JSON.stringify(response),
              }
            );

            const verifyData =
              await verifyRes.json();

            if (!verifyRes.ok) {
              throw new Error(
                verifyData.message ||
                  "Payment verification failed."
              );
            }

            /* ==========================
               PREPARE ORDER ITEMS
            ========================== */

            const orderItems = cartItems.map(
              (item) => ({
                product: item.productId,
                qty: Number(item.qty),
                price: Number(item.price),
              })
            );

            /* ==========================
               CHECK PRODUCT IDS
            ========================== */

            const invalidItem = orderItems.find(
              (item) => !item.product
            );

            if (invalidItem) {
              throw new Error(
                "Product information is missing from your cart. Please remove the item and add it again."
              );
            }

            /* ==========================
               SAVE ORDER
            ========================== */

            const saveOrderRes =
              await fetch(
                "https://vendra-ecommerce.onrender.com/api/orders",
                {
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json",

                    Authorization:
                      `Bearer ${user.token}`,
                  },

                  body: JSON.stringify({
                    items: orderItems,

                    totalAmount:
                      totalPrice,

                    address,

                    paymentId:
                      response.razorpay_payment_id,

                    paymentStatus: "paid",
                  }),
                }
              );

            const saveOrderData =
              await saveOrderRes.json();

            if (!saveOrderRes.ok) {
              throw new Error(
                saveOrderData.message ||
                  "Payment succeeded but order could not be saved."
              );
            }

            /* ==========================
               SUCCESS
            ========================== */

            dispatch(clearCart());

            setPaymentLoading(false);

            navigate("/ordersuccess");
          } catch (error) {
            console.error(
              "Payment verification/order error:",
              error
            );

            setPaymentLoading(false);

            setError(
              error.message ||
                "Something went wrong after payment."
            );
          }
        },
      };

      /* ==========================
         OPEN RAZORPAY
      ========================== */

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        (response) => {
          console.error(
            "Payment failed:",
            response.error
          );

          setPaymentLoading(false);

          setError(
            response.error?.description ||
              "Payment failed. Please try again."
          );
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "Payment error:",
        error
      );

      setPaymentLoading(false);

      setError(
        error.message ||
          "Unable to process payment."
      );
    }
  };

  /* ==========================
     SUBMIT
  ========================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentLoading) {
      return;
    }

    handlePayment();
  };

  /* ==========================
     UI
  ========================== */

  return (
    <main className="checkout-page">

      <div className="checkout-content">

        {/* HEADER */}

        <div className="checkout-header">

          <span className="cart-label">
            VENDRA CHECKOUT
          </span>

          <h2>
            Complete Your Order
          </h2>

          <p>
            Enter your shipping details
            and complete your purchase
            securely.
          </p>

        </div>

        {/* ERROR */}

        {error && (
          <div className="checkout-error">
            <span>!</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* SHIPPING */}

          <section className="shipping-section">

            <div className="checkout-section-heading">

              <span className="checkout-step">
                01
              </span>

              <div>
                <h3>
                  Shipping Address
                </h3>

                <p>
                  Where should we
                  deliver your order?
                </p>
              </div>

            </div>

            <div className="shipping-form">

              {/* FULL NAME */}

              <div className="checkout-field">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={address.fullName}
                  onChange={
                    handleAddressChange
                  }
                  required
                />

              </div>

              {/* STREET */}

              <div className="checkout-field">

                <label>
                  Street Address
                </label>

                <input
                  type="text"
                  name="street"
                  placeholder="House no. / Street / Area"
                  value={address.street}
                  onChange={
                    handleAddressChange
                  }
                  required
                />

              </div>

              {/* CITY + POSTAL CODE */}

              <div className="checkout-input-row">

                <div className="checkout-field">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={address.city}
                    onChange={
                      handleAddressChange
                    }
                    required
                  />

                </div>

                <div className="checkout-field">

                  <label>
                    Postal Code
                  </label>

                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal code"
                    value={
                      address.postalCode
                    }
                    onChange={
                      handleAddressChange
                    }
                    maxLength="6"
                    inputMode="numeric"
                    required
                  />

                </div>

              </div>

              {/* COUNTRY */}

              <div className="checkout-field">

                <label>
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={address.country}
                  onChange={
                    handleAddressChange
                  }
                  required
                />

              </div>

            </div>

          </section>

          {/* PAYMENT */}

          <section className="checkout-summary">

            <div className="summary-top">

              <div>

                <span className="summary-label">
                  ORDER TOTAL
                </span>

                <p>
                  Your final payable amount
                </p>

              </div>

              <div className="checkout-total">

                <span>
                  Total to Pay
                </span>

                <strong>
                  ₹
                  {totalPrice.toFixed(2)}
                </strong>

              </div>

            </div>

            {/* SECURE PAYMENT */}

            <div className="secure-payment-box">

              <span className="secure-icon">
                🔒
              </span>

              <div>

                <strong>
                  Secure Payment
                </strong>

                <p>
                  Payments are securely
                  processed by Razorpay.
                </p>

              </div>

            </div>

            {/* PAY BUTTON */}

            <button
              type="submit"
              className="checkout-pay-button"
              disabled={paymentLoading}
            >

              {paymentLoading ? (
                <>
                  <span className="payment-spinner"></span>
                  Processing...
                </>
              ) : (
                <>
                  Pay Securely
                  <span>→</span>
                </>
              )}

            </button>

            <p className="checkout-note">
              You will be redirected to
              Razorpay's secure checkout.
            </p>

          </section>

        </form>

      </div>

    </main>
  );
};

export default Checkout;