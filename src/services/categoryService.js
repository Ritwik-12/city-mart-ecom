import api from "./api";

export const getCategories = async (params = {}) => {
  const { data } = await api.get("/api/public/categories", {
    params: {
      pageNumber: 0,
      pageSize: 50,
      sortBy: "categoryId",
      sortOrder: "asc",
      ...params,
    },
  });
  return data;
};

export const createCategory = async (payload) => {
  const { data } = await api.post("/api/admin/catagory", payload);
  return data;
};

export const updateCategory = async (categoryId, payload) => {
  const { data } = await api.put(`/api/admin/categoreis/${categoryId}`, payload);
  return data;
};

export const deleteCategory = async (categoryId) => {
  const { data } = await api.delete(`/api/admin/categories/${categoryId}`);
  return data;
};
