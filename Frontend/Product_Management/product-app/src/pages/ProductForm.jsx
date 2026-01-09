import { useState } from "react";
import { createProduct } from "../api/productApi";

const ProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categories: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};
    if (!form.name) err.name = "Name required";
    if (!form.description) err.description = "Description required";
    if (!form.price || form.price <= 0) err.price = "Valid price required";
    if (!form.stock || form.stock < 0) err.stock = "Valid stock required";
    if (!form.categories) err.categories = "At least one category required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      categories: form.categories.split(",")
    };

    try {
      await createProduct(payload);
      alert("Product Created!");
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        categories: ""
      });
    } catch {
      alert("Failed to create product");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>

      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      {errors.name && <span>{errors.name}</span>}

      <input placeholder="Description" onChange={e => setForm({...form, description: e.target.value})} />
      {errors.description && <span>{errors.description}</span>}

      <input type="number" placeholder="Price" onChange={e => setForm({...form, price: e.target.value})} />
      {errors.price && <span>{errors.price}</span>}

      <input type="number" placeholder="Stock" onChange={e => setForm({...form, stock: e.target.value})} />
      {errors.stock && <span>{errors.stock}</span>}

      <input placeholder="Categories (comma separated)" onChange={e => setForm({...form, categories: e.target.value})} />
      {errors.categories && <span>{errors.categories}</span>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
