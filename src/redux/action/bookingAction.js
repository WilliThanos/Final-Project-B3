import axios from "axios";

import { setMethod } from "../reducers/paymentReducer";
import { setBookedPassengers } from "../reducers/passengersReducer";
import { sethistoryPemesanan } from "../reducers/historyBookingReducer";

export const getBooking = () => async (dispatch, getState) => {
  try {
    const token = getState().auth?.token;
    const passengers = getState().passengers?.passengers;

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    // Log passengers array to inspect the data
    console.log("Passengers from state: ", passengers);

    // Format passengers data
    const formattedPassengers = passengers?.map((passenger) => {
      // Log each passenger to inspect individual properties
      console.log("Passenger data: ", passenger);
      return {
        birth_date: passenger?.tanggalLahir || "",
        type: passenger?.kategori || "",
        id_passport_number: passenger?.nik || "",
        citizenship: passenger?.citizenship || "ID",
        gender: passenger?.jenisKelamin || "",
        first_name: passenger?.namaDepan || "",
        last_name: passenger?.namaBelakang || "",
        phone_number: passenger?.nomorHP || "", // Provide default empty string if undefined
      };
    });

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0
    const day = String(today.getDate()).padStart(2, "0");

    const bookingData = {
      booking_date: `${year}-${month}-${day}`,
      total_passenger: passengers.length,
      passengers: formattedPassengers,
    };

    // Log formatted booking data to inspect the result
    console.log("Formattedaa bookingData :>> ", bookingData);

    const scheduleId = getState().ticket?.selectedDepartureFlightId;
    const returnscheduleId = getState().ticket?.selectedReturnFlightId;

    // if (!scheduleId || !returnscheduleId) {
    //   throw new Error("Flight IDs are missing");
    // }

    const response = await axios.post(
      `https://expressjs-develop-b4d1.up.railway.app/api/v1/booking?schedule_id=${scheduleId}&return_schedule_id=${returnscheduleId}`,
      bookingData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("response Booking :>> ", response);
    dispatch(setBookedPassengers(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error);
      alert(error.response?.data?.message || error.message);
      return;
    }
    console.error("Unexpected error:", error);
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

export const getBookingHistory = () => async (dispatch, getState) => {
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
      "https://expressjs-develop-b4d1.up.railway.app/api/v1/get-booking",
      config
    );

    // console.log("response method redux :>> ", response?.data);
    dispatch(sethistoryPemesanan(response?.data?.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error);

      return;
    }
    alert(error?.message);
  }
};
