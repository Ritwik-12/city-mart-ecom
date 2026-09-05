import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  decreaseCartItem,
  getCart,
  increaseCartItem,
  removeCartItem,
} from "../../services/cartService";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      return await getCart();
    } catch (error) {
     return rejectWithValue(
  error.response?.data?.message ||
  error.response?.data ||
  error.message ||
  "Cart request failed"
);
    }
  },
);

// export const addProduct = createAsyncThunk(
//   "cart/addProduct",
//   async ({ productId, quantity = 1 }, { rejectWithValue }) => {
//     try {
//       return await addToCart(productId, quantity);
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   },
// );



export const addProduct = createAsyncThunk(
  "cart/addProduct",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      await addToCart(productId, quantity);

      // Always get the complete latest cart from the backend
      return await getCart();
    } catch (error) {
      return rejectWithValue(
  error.response?.data?.message ||
  error.response?.data ||
  error.message ||
  "Cart request failed"
);
    }
  },
);

export const incrementProduct = createAsyncThunk(
  "cart/incrementProduct",
  async (productId, { rejectWithValue }) => {
    try {
      return await increaseCartItem(productId);
    } catch (error) {
     return rejectWithValue(
  error.response?.data?.message ||
  error.response?.data ||
  error.message ||
  "Cart request failed"
);
    }
  },
);

export const decrementProduct = createAsyncThunk(
  "cart/decrementProduct",
  async (productId, { rejectWithValue }) => {
    try {
      return await decreaseCartItem(productId);
    } catch (error) {
     return rejectWithValue(
  error.response?.data?.message ||
  error.response?.data ||
  error.message ||
  "Cart request failed"
);
    }
  },
);

export const removeProduct = createAsyncThunk(
  "cart/removeProduct",
  async ({ cartId, productId }, { rejectWithValue }) => {
    try {
      await removeCartItem(cartId, productId);
      return await getCart();
    } catch (error) {
      return rejectWithValue(
  error.response?.data?.message ||
  error.response?.data ||
  error.message ||
  "Cart request failed"
);
    }
  },
);

const initialState = {
  cartId: null,
  totalPrice: 0,
  products: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: () => initialState,
  },
  extraReducers: (builder) => {
    const setCart = (state, action) => {
      state.loading = false;
      state.error = null;
      state.cartId = action.payload?.cartId ?? null;
      state.totalPrice = Number(action.payload?.totalPrice || 0);
      state.products = action.payload?.products || [];
    };

    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, setCart)
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, setCart)
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(incrementProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(incrementProduct.fulfilled, setCart)
      .addCase(incrementProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(decrementProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(decrementProduct.fulfilled, setCart)
      .addCase(decrementProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeProduct.fulfilled, setCart)
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
