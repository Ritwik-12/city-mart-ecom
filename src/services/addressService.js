import api from "./api";

export const getUserAddresses = async () => {
  const { data } = await api.get("/api/user/address");
  return data;
};

export const getAddressById = async (addressId) => {
  const { data } = await api.get(`/api/address/${addressId}`);
  return data;
};

export const createAddress = async (payload) => {
  const { data } = await api.post("/api/address", payload);
  return data;
};

export const updateAddress = async (addressId, payload) => {
  const { data } = await api.put(`/api/address/${addressId}`, payload);
  return data;
};

export const deleteAddress = async (addressId) => {
  const { data } = await api.delete(`/api/address/${addressId}`);
  return data;
};
