import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "../api/productApi";
import { fetchCategories } from "../api/productApi";
import Select from "react-select";
import "../css/Product.css";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

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
    const init = async () => {
      await loadCategories();
      if (id) {
        await loadProduct();
      }
    };

    init();
  }, [id]);

 useEffect(() => {
  if (!isEdit) return;
  if (categories.length === 0) return;
  if (selectedCategories.length > 0) return; // 👈 important

  const preSelected = categories.filter(opt =>
    form.categoryIds.includes(opt.value)
  );

  setSelectedCategories(preSelected);
}, [categories, form.categoryIds, isEdit, selectedCategories.length]);

  const loadCategories = async () => {
    const data = await fetchCategories();

    const options = data.map((c) => ({
      value: c.id,
      label: c.categoryName,
    }));

    setCategories(options);
    return options;
  };

  //Load product on edit icon click
  const loadProduct = async () => {
    const product = await getProductById(id);
    const categoryIds = product.categories?.map((c) => c.id) || [];

    setForm({
      name: product.productName,
      description: product.description,
      price: product.price,
      stock: product.stockQuantity,
      categoryIds: categoryIds,
    });
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
      id: isEdit ? Number(id) : undefined,
      name: form.name,
      description: form.description,
      price: Number(form.price),
      stockQuantity: Number(form.stock),
      categoryIds: form.categoryIds,
    };

    try {
      if (isEdit) {
        await updateProduct(payload);
        alert("Product Updated Successfully!");
      } else {
        await createProduct(payload);
        alert("Product Created Successfully!");
      }

      navigate("/");

      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryIds: [],
      });

      setSelectedCategories([]);
    } catch (error) {
      alert(error.message || "Failed to create product");
    }
  };

  return (
    <div className="form-container">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>

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
          {isEdit ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
