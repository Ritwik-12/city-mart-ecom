import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPaymentIntent } from "../../services/clientService";
 
// amount must already be in paise (whole rupees * 100) by the time it gets here
export const fetchClientSecret = createAsyncThunk(
  "stripe/fetchClientSecret",
  async ({ amount, currency = "inr" }, { rejectWithValue }) => {
    try {
      return await createPaymentIntent({ amount, currency });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Unable to start payment. Please try again.",
      );
    }
  },
);
 
const stripeSlice = createSlice({
  name: "stripe",
  initialState: {
    clientSecret: null,
    isLoading: false,
    errorMessage: null,
  },
  reducers: {
    clearClientSecret: (state) => {
      state.clientSecret = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientSecret.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(fetchClientSecret.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clientSecret = action.payload;
      })
      .addCase(fetchClientSecret.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload || "Unable to start payment.";
      });
  },
});
 
export const { clearClientSecret } = stripeSlice.actions;
export default stripeSlice.reducer;
 