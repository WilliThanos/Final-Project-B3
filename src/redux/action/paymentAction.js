import axios from "axios";
import { setData } from "../reducers/paymentReducer";

export const payment = () => async (dispatch, getState) => {
  try {
    const token = getState().auth?.token;
    const code = getState().payment?.Metode;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `https://expressjs-develop-b4d1.up.railway.app/api/v1/pay?booking_id=15&payment_method=${code}`,
      {}, // Jika tidak ada data payload yang perlu dikirim, tambahkan objek kosong di sini
      config
    );

    console.log("response payment :>> ", response);
    dispatch(setData(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      // alert(error.message);
      return;
    }
    console.error("Error:", error.message);
    // alert(error.message);
  }
};
