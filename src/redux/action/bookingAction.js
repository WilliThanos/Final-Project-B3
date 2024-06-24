import axios from "axios";
import { setBookedPassengers } from "../reducers/passengersReducer";

export const getBooking = () => async (dispatch, getState) => {
  try {
    const token = getState().auth?.token;
    const passengers = getState().passengers.passengers; // Extract passengers from Redux state

    // Format passengers data
    const formattedPassengers = passengers.map((passenger) => ({
      full_name: `${passenger.namaDepan} ${passenger.namaBelakang}`,
      birth_date: passenger.tanggalLahir,
      type: passenger.kategori,
      id_passport_number: passenger.nik,
      citizenship: passenger.citizenship || "ID", // Assuming default citizenship to 'ID'
    }));

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0
    const day = String(today.getDate()).padStart(2, "0");

    const bookingData = {
      booking_date: `${year}-${month}-${day}`,
      total_passenger: passengers.length,
      passengers: formattedPassengers,
    };

    console.log("bookingData :>> ", bookingData);

    const scheduleId = getState().ticket?.selectedDepartureFlightId;

    const response = await axios.post(
      `https://expressjs-develop-b4d1.up.railway.app/api/v1/booking?schedule_id=${scheduleId}`,
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
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};
