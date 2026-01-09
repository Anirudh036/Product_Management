import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

const PAGE_SIZE = 10;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

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

  return (
    <div>
      <h2>Product List</h2>

      <SearchBar value={search} onChange={setSearch} />

      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ProductList;
