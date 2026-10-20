import api from "./api";

export const placeOrder = async (paymentMethod, payload) => {
  const { data } = await api.post(
    `/api/order/users/payments/${encodeURIComponent(paymentMethod)}`,
    payload,
  );
  return data;
};

export const createRazorpayOrder = async () => {
  const { data } = await api.post("/api/order/razorpay/create");
  return data; // { keyId, razorpayOrderId, amount, currency }
};