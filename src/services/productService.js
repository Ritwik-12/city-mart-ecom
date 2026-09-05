import api from "./api";

const normalizeProduct = (product) => {
  if (!product) return product;

  const image = product.image;
  const imageUrl =
    image && /^https?:\/\//i.test(image)
      ? image
      : image
        ? `${import.meta.env.VITE_API_BASE_URL || "http://localhost:9090"}/images/${String(image).replace(/^\/+/, "")}`
        : null;

  return { ...product, image: imageUrl };
};

const normalizeResponse = (response) => ({
  ...response,
  content: (response?.content || []).map(normalizeProduct),
});

export const getProducts = async (params = {}) => {
  const { data } = await api.get("/api/public/products", {
    params: {
      pageNumber: 0,
      pageSize: 12,
      sortBy: "productId",
      sortOrder: "asc",
      ...params,
    },
  });
  return normalizeResponse(data);
};

export const getProductsByCategory = async (categoryId, params = {}) => {
  const { data } = await api.get(`/api/public/category/${categoryId}/products`, {
    params: {
      pageNumber: 0,
      pageSize: 12,
      sortBy: "productId",
      sortOrder: "asc",
      ...params,
    },
  });
  return normalizeResponse(data);
};

export const searchProductsByKeyword = async (keyword, params = {}) => {
  const { data } = await api.get("/api/public/products", {
    params: {
      keyword: keyword.trim(),
      pageNumber: 0,
      pageSize: 12,
      sortBy: "productId",
      sortOrder: "asc",
      ...params,
    },
  });

  return normalizeResponse(data);
};

export const createProduct = async (categoryId, payload) => {
  const { data } = await api.post(
    `/api/admin/categories/${categoryId}/product`,
    payload,
  );
  return normalizeProduct(data);
};

export const updateProduct = async (productId, payload) => {
  const { data } = await api.put(`/api/admin/product/${productId}`, payload);
  return normalizeProduct(data);
};

export const deleteProduct = async (productId) => {
  const { data } = await api.delete(`/api/admin/product/${productId}`);
  return normalizeProduct(data);
};

export const uploadProductImage = async (productId, file) => {
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await api.put(`/api/products/${productId}/image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return normalizeProduct(data);
};
