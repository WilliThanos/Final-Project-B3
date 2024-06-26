import axios from "axios";
import { setData } from "../reducers/paymentReducer";

export const payment = () => async (dispatch, getState) => {
  try {
    const token = getState().auth?.token;
    const code = getState().payment?.Metode;
    const id = getState().passengers?.bookedPassengers?.data?.id;
    console.log("ID", id);
    console.log("code", code);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `https://expressjs-develop-b4d1.up.railway.app/api/v1/pay?booking_id=${id}&payment_method=${code}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("response payment :>> ", response);
    dispatch(setData(response));
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
