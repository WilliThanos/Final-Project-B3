import axios from "axios";
import { setData } from "../reducers/paymentReducer";

export const payment = () => async (dispatch, getState) => {
  try {
    const token = getState().auth?.token;
    const code = getState().payment?.Metode;
    const id = getState().passengers?.bookedPassengers?.data?.id;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `https://expressjs-develop-b4d1.up.railway.app/api/v1/pay?booking_id=${id}&payment_method=${code}`,
      {}, // Tambahkan objek kosong jika tidak ada payload data
      config // Gunakan konfigurasi headers dari config
    );

    dispatch(setData(response.data)); // Sesuaikan data yang diambil dari response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      return;
    }
    console.error("Error:", error.message);
  }
};
