import axios from "axios";
import { setMethod } from "../reducers/paymentReducer";

export const booking = () => async (dispatch, getState) => {
  try {
    const response = await axios.post(
      "http://expressjs-develop-b4d1.up.railway.app/api/v1/auth/verifikasi?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE4MjAzMjgyfQ.PCQvMZBgiO3PaotvcwbXVIkFz2uSGwdK6C0thtr9vAw",
      {
        email: emailData,
        password: passwordData,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("response Booking :>> ", response);
    // dispatch(setToken(responseLogin.data.data.token));
    // if (response?.status === 200) {
    //   //   navigate("/");
    //   //   dispatch(setMessage("Login successful"));
    // }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getMethodPayment = () => async (dispatch, getState) => {
  try {
    const token = getState().auth?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // withCredentials: true, // Mengizinkan pengiriman cookie
    };

    const response = await axios.get(
      "https://expressjs-develop-b4d1.up.railway.app/api/v1/get-payment-list",
      config
    );

    // console.log("response method redux :>> ", response?.data);
    dispatch(setMethod(response?.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error);
      alert(error?.message);
      return;
    }
    alert(error?.message);
  }
};
