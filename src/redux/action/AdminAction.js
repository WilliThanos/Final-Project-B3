import axios from "axios";
import setData, { setAkun } from "../reducers/adminReducer";

export const getAllUser = () => async (dispatch, getState) => {
  try {
    const token = getState().auth?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(
      "https://expressjs-develop-b4d1.up.railway.app/api/v1/users",
      config
    );

    console.log("response method redux :>> ", response?.data);
    dispatch(setAkun(response?.data?.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);

      return;
    }
    alert(error?.message);
  }
};

export const hapusAkun = (idAkun) => async (dispatch, getState) => {
  try {
    console.log("CEK ID AKUN :>> ", idAkun);
    const token = getState().auth?.token;
    console.log("CEK TOKEN :>> ", token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.delete(
      `https://expressjs-develop-b4d1.up.railway.app/api/v1/users/${idAkun}`,
      config
    );

    console.log("response hapus redux :>> ", response?.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);

      return;
    }
    alert(error?.message);
  }
};
