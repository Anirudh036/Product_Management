import { useState, useEffect } from "react";
import { createProduct } from "../api/productApi";
import { fetchCategories } from "../api/productApi";
import Select from "react-select";
import "../css/Product.css";

const ProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryIds: [],
  });

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await fetchCategories();

    const options = data.map((c) => ({
      value: c.id,
      label: c.categoryName,
    }));

    setCategories(options);
  };

  const validate = () => {
    let err = {};
    if (!form.name) err.name = "Name is required";
    if (!form.price || form.price <= 0) err.price = "Valid price required";
    if (!form.stock || form.stock < 0) err.stock = "Valid stock required";
    if (form.categoryIds.length === 0)
      err.categoryIds = "Select at least one category";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleCategoryChange = (selected) => {
    setSelectedCategories(selected || []);
    setForm({
      ...form,
      categoryIds: selected ? selected.map((c) => c.value) : [],
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  const payload = {
    name: form.name,
    description: form.description,
    price: Number(form.price),
    stock: Number(form.stock),
    categoryIds: form.categoryIds, // ✅ correct
  };

  try {
    await createProduct(payload);
    alert("Product Created Successfully!");

    // ✅ PROPER RESET
    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      categoryIds: [], // 👈 MUST
    });

    setSelectedCategories([]); // 👈 if using react-select

  } catch (error) {
    alert(error.message || "Failed to create product");
  }
};


  return (
    <div className="form-container">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>Add Product</h2>

        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="3"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label>Stock Quantity</label>
          <input
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
          {errors.stock && <span className="error">{errors.stock}</span>}
        </div>

        <div className="form-group">
          <label>Categories</label>
          <div className="select-wrapper">
            <Select
              isMulti
              options={categories}
              value={selectedCategories}
              onChange={handleCategoryChange}
              classNamePrefix="select"
              placeholder="Select categories..."
            />
          </div>
          {errors.categoryIds && (
            <span className="error">{errors.categoryIds}</span>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
