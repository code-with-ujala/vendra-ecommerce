import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/adminUsers.css";

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/auth/users", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (user?.token) {
      fetchUsers();
    }
  }, [user]);

  return (
    <div className="admin-users-container">

      {/* Header */}
      <div className="admin-users-header">
        <div>
          <h2>User Directory</h2>
          <p>View and manage registered Vendra users.</p>
        </div>

        <div className="user-count">
          {users.length} Users
        </div>
      </div>

      {/* Table */}
      <div className="users-table-wrapper">
        <table className="users-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>JOINED</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>

                <td className="user-id-cell">
                  {u._id.substring(0, 8)}...
                </td>

                <td className="user-name-cell">
                  {u.name}
                </td>

                <td className="user-email-cell">
                  {u.email}
                </td>

                <td>
                  <span
                    className={
                      u.role === "admin"
                        ? "role-badge role-admin"
                        : "role-badge role-user"
                    }
                  >
                    {u.role.toUpperCase()}
                  </span>
                </td>

                <td className="joined-cell">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

        {users.length === 0 && (
          <p className="no-users">
            No users found.
          </p>
        )}
      </div>

    </div>
  );
};

export default AdminUsers;