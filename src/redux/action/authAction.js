import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  setToken,
} from "../reducers/authReducer";
import axios from "axios";
import Cookies from "js-cookie";

// import axiosWithToken from "../../api/AxiosWithToken";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { dispatch }) => {
    dispatch(registerRequest());
    try {
      const response = await axios.post(
        "https://expressjs-develop-b4d1.up.railway.app/api/v1/auth/daftar-sekarang",
        userData
      );
      const message = {
        type: "success",
        message: response.data.message,
      };
      dispatch(registerSuccess(response.data));
      Cookies.set("flashMessage", JSON.stringify(message));
      return true;
    } catch (error) {
      dispatch(registerFailure(error.response.data.message));
      const message = {
        type: "error",
        message: error.response.data.message,
      };
      Cookies.set("flashMessage", JSON.stringify(message));
      return false;
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch }) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(
        "https://expressjs-develop-b4d1.up.railway.app/api/v1/auth/masuk",
        credentials
      );
      const message = {
        type: "success",
        message: response.message,
      };
      const { data, token } = response.data;
      const dataState = {
        data: data,
        message: "Login success!",
      };
      dispatch(loginSuccess(dataState));
      dispatch(setToken(token));
      Cookies.set("flashMessage", JSON.stringify(message));
      return true;
    } catch (error) {
      dispatch(loginFailure(error.response.data.message));
      const message = {
        type: "error",
        message: error.response.data.message,
      };
      Cookies.set("flashMessage", JSON.stringify(message));
      return false;
    }
  }
);
