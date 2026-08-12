
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/addProduct.css";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== "admin") {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return alert("Please select an image");
    }

    setLoading(true);

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    data.append("image", image);

    try {
      const res = await fetch("https://vendra-ecommerce.onrender.com/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: data,
      });

      const responseData = await res.json();

      if (res.ok) {
        alert("Product created successfully with Cloudinary Image URL!");
        navigate("/shop");
      } else {
        alert(responseData.message || "Error creating product");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">

      <div className="add-product-card">

        {/* Header */}
        <div className="add-product-header">
          <span className="admin-label">ADMIN PANEL</span>

          <h2>Add New Product</h2>

          <p>
            Create and publish a new product to your store.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="add-product-form"
        >

          {/* Product Name */}
          <div className="product-field">
            <label htmlFor="product-name">
              Product Name
            </label>

            <input
              id="product-name"
              type="text"
              placeholder="Enter product name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="product-input"
            />
          </div>

          {/* Description */}
          <div className="product-field">
            <label htmlFor="product-description">
              Description
            </label>

            <textarea
              id="product-description"
              placeholder="Describe your product..."
              required
              rows="4"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="product-input"
            />
          </div>

          {/* Price + Stock */}
          <div className="product-row">

            <div className="product-field">
              <label htmlFor="product-price">
                Price
              </label>

              <div className="price-input">
                <span>₹</span>

                <input
                  id="product-price"
                  type="number"
                  placeholder="0.00"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="product-field">
              <label htmlFor="product-stock">
                Stock Quantity
              </label>

              <input
                id="product-stock"
                type="number"
                placeholder="0"
                required
                value={formData.stock}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stock: e.target.value,
                  })
                }
                className="product-input"
              />
            </div>

          </div>

          {/* Category */}
          <div className="product-field">
            <label htmlFor="product-category">
              Category
            </label>

            <input
              id="product-category"
              type="text"
              placeholder="e.g. Electronics, Fashion..."
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
              className="product-input"
            />
          </div>

          {/* Image Upload */}
          <div className="image-upload">

            <label>
              Product Image
            </label>

            <div className="upload-box">

              <div className="upload-icon">
                ↑
              </div>

              <div className="upload-content">
                <strong>
                  Upload product image
                </strong>

                <span>
                  PNG, JPG or WEBP
                </span>
              </div>

              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) =>
                  setImage(e.target.files[0])
                }
              />

            </div>

            {image && (
              <p className="selected-image">
                ✓ {image.name}
              </p>
            )}

          </div>

          {/* Publish */}
          <button
            type="submit"
            disabled={loading}
            className="publish-btn"
          >
            {loading
              ? "Uploading & Creating..."
              : "Publish Product →"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddProduct;
