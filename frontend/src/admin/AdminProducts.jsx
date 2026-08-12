
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/adminProducts.css";

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://vendra-ecommerce.onrender.com/api/products");
        const data = await res.json();

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you strictly sure you want to delete this?")) {
      try {
        const res = await fetch(`https://vendra-ecommerce.onrender.com/api/products/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (res.ok) {
          setProducts(products.filter((p) => p._id !== id));
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="admin-products-container">

      {/* Header */}
      <div className="admin-products-header">

        <div>
          <span className="products-label">
            PRODUCT MANAGEMENT
          </span>

          <h2>
            Manage Products
          </h2>

          <p>
            View, edit and manage your store products.
          </p>
        </div>

        <Link
          to="/admin/add-product"
          className="add-product-btn"
        >
          <span>+</span>
          Add Product
        </Link>

      </div>


      {/* Product Count */}
      <div className="products-summary">
        <span>{products.length}</span>
        <p>Products in your store</p>
      </div>


      {/* Products Table */}
      <div className="admin-products-table-wrapper">

        <table className="admin-products-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>PRODUCT</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>STOCK</th>
              <th>ACTIONS</th>
            </tr>
          </thead>


          <tbody>

            {products.map((product) => (

              <tr key={product._id}>

                <td className="product-id-cell">
                  #{product._id.substring(0, 8)}...
                </td>


                <td className="product-name-cell">
                  <div className="product-info">
                    <div className="product-avatar">
                      {product.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <span>
                      {product.name}
                    </span>
                  </div>
                </td>


                <td className="price-cell">
                  ₹{Number(product.price).toFixed(2)}
                </td>


                <td className="category-cell">
                  <span className="category-badge">
                    {product.category}
                  </span>
                </td>


                <td>
                  <span
                    className={
                      product.stock > 0
                        ? "stock-available"
                        : "stock-empty"
                    }
                  >
                    {product.stock > 0
                      ? `${product.stock} Available`
                      : "Out of Stock"}
                  </span>
                </td>


                <td className="product-actions">

                  <Link
                    to={`/admin/edit-product/${product._id}`}
                    className="edit-btn"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(product._id)
                    }
                    className="delete-btn"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>


        {/* Empty State */}
        {products.length === 0 && (

          <div className="no-products">

            <div className="empty-product-icon">
              🛍️
            </div>

            <h3>
              No products found
            </h3>

            <p>
              Start adding products to your Vendra store.
            </p>

            <Link
              to="/admin/add-product"
              className="empty-add-btn"
            >
              + Add First Product
            </Link>

          </div>

        )}

      </div>

    </div>
  );
};

export default AdminProducts;
