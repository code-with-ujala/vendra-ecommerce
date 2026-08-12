
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch("https://vendra-ecommerce.onrender.com/api/analytics", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) {
            navigate("/login");
          }

          setStats({
            totalOrders: 0,
            totalProducts: 0,
            totalUsers: 0,
            totalRevenue: 0,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [user, navigate]);

  return (
    <div className="admin-dashboard">

      {/* Dashboard Header */}
      <div className="dashboard-header">

        <div className="dashboard-brand">

          <img
            src="/Vendra.logo.png"
            alt="Vendra Logo"
            className="dashboard-logo"
          />

          <div>
            <span className="admin-label">
              ADMIN PANEL
            </span>

            <h2>Admin Dashboard</h2>
          </div>

        </div>

      </div>


      {/* Welcome */}
      <p className="welcome-text">
        Welcome back, <span>{user?.name}</span>
      </p>


      {/* Statistics */}
      {stats ? (

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon purple-icon">
              #
            </div>

            <div>
              <h4>Total Orders</h4>

              <div className="stat-number">
                {stats.totalOrders}
              </div>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon pink-icon">
              +
            </div>

            <div>
              <h4>Total Products</h4>

              <div className="stat-number">
                {stats.totalProducts}
              </div>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon lavender-icon">
              👥
            </div>

            <div>
              <h4>Total Users</h4>

              <div className="stat-number">
                {stats.totalUsers}
              </div>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon green-icon">
              ₹
            </div>

            <div>
              <h4>Total Revenue</h4>

              <div className="stat-number">
                ₹{stats.totalRevenue.toFixed(2)}
              </div>
            </div>

          </div>

        </div>

      ) : (

        <div className="loading-metrics">
          Loading metrics...
        </div>

      )}


      {/* Administrative Controls */}
      <div className="admin-controls">

        <div className="controls-heading">

          <h3>
            Administrative Controls
          </h3>

          <p>
            Manage your Vendra store from one place.
          </p>

        </div>


        <div className="control-buttons">

          <button
            className="admin-btn primary-admin-btn"
            onClick={() => navigate("/admin/add-product")}
          >

            <span className="control-icon">
              +
            </span>

            <span>
              <strong>Add Product</strong>
              <small>Create a new product</small>
            </span>

            <span className="control-arrow">
              →
            </span>

          </button>


          <button
            className="admin-btn"
            onClick={() => navigate("/admin/products")}
          >

            <span className="control-icon">
              📦
            </span>

            <span>
              <strong>Manage Products</strong>
              <small>View and edit products</small>
            </span>

            <span className="control-arrow">
              →
            </span>

          </button>


          <button
            className="admin-btn"
            onClick={() => navigate("/admin/orders")}
          >

            <span className="control-icon">
              🚚
            </span>

            <span>
              <strong>Manage Orders</strong>
              <small>Track customer orders</small>
            </span>

            <span className="control-arrow">
              →
            </span>

          </button>


          <button
            className="admin-btn"
            onClick={() => navigate("/admin/users")}
          >

            <span className="control-icon">
              👥
            </span>

            <span>
              <strong>Users Directory</strong>
              <small>Manage registered users</small>
            </span>

            <span className="control-arrow">
              →
            </span>

          </button>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;

