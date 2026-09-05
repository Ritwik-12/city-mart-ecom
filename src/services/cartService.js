import api from "./api";

export const getCart = async () => {
  const { data } = await api.get("/api/carts/users/cart");
  return data;
};

export const addToCart = async (productId, quantity = 1) => {
  const { data } = await api.post(
    `/api/carts/products/${productId}/quantity/${quantity}`,
  );
  return data;
};

export const increaseCartItem = async (productId) => {
  const { data } = await api.put(
    `/api/cart/product/${productId}/quantity/add`,
  );
  return data;
};

export const decreaseCartItem = async (productId) => {
  const { data } = await api.put(
    `/api/cart/product/${productId}/quantity/delete`,
  );
  return data;
};

export const removeCartItem = async (cartId, productId) => {
  const { data } = await api.delete(
    `/api/cart/${cartId}/product/${productId}`,
  );
  return data;
};
