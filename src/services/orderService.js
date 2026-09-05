import api from "./api";

export const placeOrder = async (paymentMethod, payload) => {
  const { data } = await api.post(
    `/api/order/users/payments/${encodeURIComponent(paymentMethod)}`,
    payload,
  );
  return data;
};
