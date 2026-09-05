import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import stripeReducer from "./slices/stripeSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    stripe: stripeReducer,
  },
});
