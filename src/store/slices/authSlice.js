import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  signIn,
  signOut,
  signUp,
} from "../../services/authService";

const storedUser = (() => {
  try {
    return JSON.parse(localStorage.getItem("ecom:user") || "null");
  } catch {
    return null;
  }
})();

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      return await signIn(payload);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to sign in. Please check your credentials.",
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      return await signUp(payload);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to create your account.",
      );
    }
  },
);

export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async (_, { rejectWithValue }) => {
    try {
      return await getCurrentUser();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      return await signOut();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser,
    loading: false,
    restoring: true,
    error: null,
  },
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.restoring = false;
      localStorage.setItem("ecom:user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      state.restoring = false;
      localStorage.removeItem("ecom:user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.restoring = false;
        state.user = action.payload;
        localStorage.setItem("ecom:user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.restoring = false;
        state.error = action.payload || "Login failed.";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed.";
      })
      .addCase(restoreSession.pending, (state) => {
        state.restoring = true;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.restoring = false;
        state.user = action.payload;
        localStorage.setItem("ecom:user", JSON.stringify(action.payload));
      })
      .addCase(restoreSession.rejected, (state) => {
        state.restoring = false;
        state.user = null;
        localStorage.removeItem("ecom:user");
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        localStorage.removeItem("ecom:user");
      });
  },
});

export const { clearAuthError, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
