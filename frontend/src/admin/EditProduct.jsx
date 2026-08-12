import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/editProduct.css";

const EditProduct = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://vendra-ecommerce.onrender.com/api/products/${id}`);
        const data = await res.json();

        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);

    if (image) {
      data.append("image", image);
    }

    try {
      const res = await fetch(`https://vendra-ecommerce.onrender.com/api/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: data,
      });

      setLoading(false);

      if (res.ok) {
        alert("Product updated successfully!");
        navigate("/admin/products");
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);

      setLoading(false);

      alert("Something went wrong");
    }
  };

  return (
    <div className="edit-product-container">

      {/* Header */}
      <div className="edit-product-header">
        <h2 className="edit-product-title">
          Edit Product
        </h2>

        <p>
          Update your product information and inventory.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="edit-product-form"
      >

        <input
          type="text"
          placeholder="Product Name"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          className="edit-product-input"
        />

        <textarea
          placeholder="Description"
          required
          rows="4"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          className="edit-product-input"
        />

        <input
          type="number"
          placeholder="Price"
          required
          value={formData.price}
          onChange={(e) =>
            setFormData({
              ...formData,
              price: e.target.value,
            })
          }
          className="edit-product-input"
        />

        <input
          type="text"
          placeholder="Category"
          required
          value={formData.category}
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value,
            })
          }
          className="edit-product-input"
        />

        <input
          type="number"
          placeholder="Stock"
          required
          value={formData.stock}
          onChange={(e) =>
            setFormData({
              ...formData,
              stock: e.target.value,
            })
          }
          className="edit-product-input"
        />

        {/* Image Upload */}
        <div className="image-upload-box">

          <label className="image-upload-label">
            Replace Image (Optional)
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            className="image-input"
          />

        </div>

        {/* Update Button */}
        <button
          type="submit"
          disabled={loading}
          className="update-product-btn"
        >
          {loading
            ? "Updating..."
            : "Update Product"}
        </button>

      </form>

    </div>
  );
};

export default EditProduct;