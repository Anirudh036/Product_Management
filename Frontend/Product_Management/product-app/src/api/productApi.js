import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async (page = 1, pageSize = 10, search = "") => {
  const response = await axios.get(
    `${BASE_URL}/Products/GetAllProducts`,
    {
      params: { page, pageSize, search },
    }
  );

  if (!response.data.success) {
    throw new Error(response.data.errorMessage || "Failed to fetch products");
  }

  return response.data.data; // 👈 return inner data
};

export const createProduct = async (product) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};
