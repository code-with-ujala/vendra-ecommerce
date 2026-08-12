import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/adminOrders.css";

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://vendra-ecommerce.onrender.com/api/orders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (user?.token) {
      fetchOrders();
    }
  }, [user]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`https://vendra-ecommerce.onrender.com/api/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === id
              ? { ...order, status }
              : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="admin-orders-container">

      {/* Header */}
      <div className="admin-orders-header">

        <div>
          <span className="orders-label">
            ORDER MANAGEMENT
          </span>

          <h2 className="admin-orders-title">
            Manage Orders
          </h2>

          <p className="admin-orders-subtitle">
            View customer orders and update their delivery status.
          </p>
        </div>

        <div className="orders-count">
          <span>{orders.length}</span>
          <small>Total Orders</small>
        </div>

      </div>

      {/* Orders Table */}
      <div className="orders-table-wrapper">

        <table className="orders-table">

          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>USER</th>
              <th>TOTAL</th>
              <th>DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody>

            {orders.map((order) => {

              // User name first priority
              // Checkout full name as fallback
              const customerName =
                order.user?.name ||
                order.address?.fullName ||
                "Unknown Customer";

              return (
                <tr key={order._id}>

                  {/* Order ID */}
                  <td className="order-id-cell">
                    #{order._id.substring(0, 8)}...
                  </td>

                  {/* User */}
                  <td className="user-cell">

                    <div className="user-info">

                      <div className="user-avatar">
                        {customerName
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <span>
                        {customerName}
                      </span>

                    </div>

                  </td>

                  {/* Total */}
                  <td className="order-total-cell">
                    ₹{Number(order.totalAmount).toFixed(2)}
                  </td>

                  {/* Date */}
                  <td className="order-date-cell">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </td>

                  {/* Status */}
                  <td>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className={`status-select status-${order.status}`}
                    >

                      <option value="pending">
                        Pending
                      </option>

                      <option value="shipped">
                        Shipped
                      </option>

                      <option value="delivered">
                        Delivered
                      </option>

                    </select>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

        {/* Empty State */}
        {orders.length === 0 && (

          <div className="no-orders">

            <div className="empty-icon">
              📦
            </div>

            <h3>
              No orders found
            </h3>

            <p>
              Customer orders will appear here once they are placed.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default AdminOrders; 