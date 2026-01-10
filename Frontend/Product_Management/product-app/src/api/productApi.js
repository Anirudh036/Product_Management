import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async (page = 1, pageSize = 10, search = "") => {
  const response = await axios.get(`${BASE_URL}/Products/GetAllProducts`, {
    params: { page, pageSize, search },
  });

  if (!response.data.success) {
    throw new Error(response.data.errorMessage || "Failed to fetch products");
  }

  return response.data.data;
};

export const createProduct = async (product) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/Products/CreateProduct`,
      product,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    if (response.data?.success === false) {
      throw new Error(response.data?.errorMessage || "Product creation failed");
    }

    return response.data;
  } catch (error) {
    if (!error.response) {
      throw new Error("Server is not responding. Please try again later.");
    }

    const message =
      error.response.data?.errorMessage ||
      error.response.data?.message ||
      "Something went wrong while creating product";

    throw new Error(message);
  }
};

export const fetchCategories = async () => {
  const response = await axios.get(`${BASE_URL}/Products/GetAllCategories`);

  if (!response.data.success) {
    throw new Error("Failed to load categories");
  }

  return response.data.data;
};

export const getProductById = async (id) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/Products/GetProductById`,
      id,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.errorMessage);
    }

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.errorMessage || "Failed to load product"
    );
  }
};

export const updateProduct = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/Products/UpdateProduct`,
      payload
    );

    if (!response.data.success) {
      throw new Error(response.data.errorMessage);
    }

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.errorMessage || "Failed to update product"
    );
  }
};
