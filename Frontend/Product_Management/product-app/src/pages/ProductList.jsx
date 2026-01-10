import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import "../css/Product.css";

const PAGE_SIZE = 5;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, [page, search]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts(page, PAGE_SIZE, search);
      setProducts(data.result);
      setTotalPages(Math.ceil(data.totalCount / PAGE_SIZE));
    } catch (error) {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (id) => {
  navigate(`/products/edit/${id}`);
 };

  return (
    <div>
      <h2>Product List</h2>

      <SearchBar  value={search} onChange={setSearch} />

       <table className="tbl" border="1" cellPadding="10" cellSpacing="0" width="100%" >
        <thead className="th">
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price (₹)</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="3" align="center">
                No products found
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.productName}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td style={{ textAlign: "center" }}>
                  <FaEdit
                    style={{ cursor: "pointer", marginRight: "12px", color: "black" }}
                    title="Edit"
                    onClick={() => handleEdit(product.id)}
                  />
                  <FaTrash
                    style={{ cursor: "pointer", color: "black" }}
                    title="Delete"
                    onClick={() => handleDelete(product.id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ProductList;
