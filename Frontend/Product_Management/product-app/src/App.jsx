import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Products</Link> | <Link to="/add">Add Product</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<ProductForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App
