import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/profile.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const res = await fetch('https://vendra-ecommerce.onrender.com/api/orders/myorders', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

        const data = await res.json();

        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          if (res.status === 401) {
            logout();
            navigate('/login');
          }

          setOrders([]);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="profile-container">

      {/* Profile Header */}
      <div className="profile-header">

        <div>
          <h2 className="profile-title">
            My Profile
          </h2>

          <p className="profile-info">
            Name: {user.name}
          </p>

          <p className="profile-info">
            Email: {user.email}
          </p>

          <div className="account-type">
            Account Type: {user.role.toUpperCase()}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>

      </div>

      {/* Order History */}
      <h3 className="order-history-title">
        Order History
      </h3>

      {loading ? (
        <p className="loading-text">
          Fetching your orders...
        </p>
      ) : orders.length === 0 ? (

        <div className="no-orders">

          <p>
            You haven't placed any orders yet.
          </p>

          <Link to="/shop" className="shop-btn">
            Start Shopping
          </Link>

        </div>

      ) : (

        <div className="orders-list">

          {orders.map((order) => (

            <div
              key={order._id}
              className="order-card"
            >

              <div className="order-details">

                <p>
                  Order ID:
                  <span>{order._id}</span>
                </p>

                <p>
                  Placed On:
                  <span>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </p>

                <p>
                  Total:
                  <strong>
                    ₹{order.totalAmount.toFixed(2)}
                  </strong>
                </p>

              </div>

              <div>
                <span
                  className={`order-status ${
                    order.status === 'Delivered'
                      ? 'status-delivered'
                      : order.status === 'Shipped'
                      ? 'status-shipped'
                      : 'status-pending'
                  }`}
                >
                  {order.status}
                </span>
              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default Profile;