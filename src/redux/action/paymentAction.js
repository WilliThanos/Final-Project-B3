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
      {},
      config
    );
    dispatch(setData(response?.data));
    const link = getState().payment?.Data?.transaction?.checkout_url;
    console.log("link payment :>> ", link);

    window.open(link, "_blank");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      return;
    }
    console.error("Error:", error.message);
  }
};
