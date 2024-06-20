import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  loading: true,
  user: {},
  error: false,
  message: null,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.message = { type: "success", message: action.payload.message };
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = { type: "error", message: action.payload };
    },
    loginRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      state.error = false;
      state.message = { type: "success", message: action.payload.message };
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = { type: "error", message: action.payload };
    },
    forgotPasswordRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.message = { type: "success", message: action.payload.message };
    },
    forgotPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = { type: "error", message: action.payload };
    },
    resetPasswordRequest: (state) => {
      state.loading = true;
      state.error = false;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.message = { type: "success", message: action.payload.message };
    },
    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = { type: "error", message: action.payload };
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearMessage(state) {
      state.error = false;
      state.message = null;
      Cookies.remove("flashMessage");
      // localStorage.removeItem('flashMessage');
    },
    logout: (state) => {
      state.token = null;
      window.location.reload();
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  setToken,
  clearMessage,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
