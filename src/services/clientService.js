import api from "./api";
 
/**
 * Asks the backend to create a Stripe PaymentIntent and returns its client
 * secret. `amount` must be in the smallest currency unit (paise for INR),
 * matching what OrderServiceImpl verifies server-side when the order is placed.
 */
export const createPaymentIntent = async ({ amount, currency = "inr" }) => {
  const { data } = await api.post("/api/order/stripe-client-secret", {
    amount,
    currency,
  });
  return data; // backend returns the client secret as a raw string
};