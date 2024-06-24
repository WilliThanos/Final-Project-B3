import axios from "axios";
import {
  setAllAirport,
  setDepartureAirport,
  setArrivalAirport,
} from "../reducers/dataReducer";
import {
  setDepartureFlights,
  setReturnFlights,
} from "../reducers/ticketReducer";
import { setProfile, setUpdateProfile } from "../reducers/profileReducer";

export const updateProfile = () => async (dispatch) => {
  try {
    const token = getState().auth?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // withCredentials: true, // Mengizinkan pengiriman cookie
    };

    const response = await axios.put(
      "https://expressjs-develop-b4d1.up.railway.app/api/v1/profil",
      config
    );

    console.log("response profile redux :>> ", response.data);
    dispatch(setUpdateProfile(response.data.data)); // Dispatch data yang diterima dari API
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      alert(error.response?.data?.message || error.message);
      return;
    }
    console.error("Error:", error.message);
    alert(error.message);
  }
};

export const getAllAirports = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `https://expressjs-develop-b4d1.up.railway.app/api/v1/bandara`
    );
    dispatch(setAllAirport(response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getProfile = () => async (dispatch, getState) => {
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
      "https://expressjs-develop-b4d1.up.railway.app/api/v1/profil",
      config
    );

    console.log("response profile redux :>> ", response?.data);
    dispatch(setProfile(response?.data?.data)); // Dispatch data yang diterima dari API
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error);
      alert(error?.message);
      return;
    }
    alert(error?.message);
  }
};

export const getDepartureAirport = () => async (dispatch, getState) => {
  try {
    const id = getState().data?.departureAirportId;
    // const allAirport = getState().data?.allAirport;
    // const departureAirport = allAirport?.find((airport) => airport.id === id);
    // console.log("departureAirport :>> ", departureAirport);
    console.log("REDUX id", id);
    const response = await axios.get(
      `https://expressjs-develop-b4d1.up.railway.app/api/v1/bandara/${id}`
    );
    // console.log("REDUX response", response.data);
    dispatch(setDepartureAirport(response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getArrivalAirport = () => async (dispatch, getState) => {
  try {
    const id = getState().data?.arrivalAirportId;

    console.log("REDUX id", id);
    const response = await axios.get(
      `https://expressjs-develop-b4d1.up.railway.app/api/v1/bandara/${id}`
    );
    // console.log("REDUX response", response.data);
    dispatch(setArrivalAirport(response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getSearchTicket = () => async (dispatch, getState) => {
  try {
    const departureAirportCode = getState().data?.departureAirport?.iata_code;
    const arrivalAirportCode = getState().data?.arrivalAirport?.iata_code;
    const departureDate = getState().data?.departureDate;
    const returnDate = getState().data?.returnDate;
    const ticketClass = getState().data?.class;

    const passengerClass =
      ticketClass !== null ? ticketClass.toUpperCase() : null;

    console.log("passengerClass :>> ", passengerClass);

    const formattedDepartureDate = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(departureDate));

    const formattedReturnDate = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(returnDate));

    function parseAndFormatDate(dateStr) {
      // Create a mapping for Indonesian months
      const monthMap = {
        Januari: "01",
        Februari: "02",
        Maret: "03",
        April: "04",
        Mei: "05",
        Juni: "06",
        Juli: "07",
        Agustus: "08",
        September: "09",
        Oktober: "10",
        November: "11",
        Desember: "12",
      };

      // Split the input date string
      const [dayName, day, monthName, year] = dateStr.split(" ");

      const month = monthMap[monthName];

      const dayFormatted = day.length === 1 ? `0${day}` : day;

      return `${year}-${month}-${dayFormatted}`;
    }

    const searchingDepartureDate = parseAndFormatDate(formattedDepartureDate);
    console.log("searchingDepartureDate :>> ", searchingDepartureDate);

    const searchingReturnDate = parseAndFormatDate(formattedReturnDate);
    console.log("searchingReturnDate :>> ", searchingReturnDate);

    console.log("REDUX DEPARTURE >>>", departureAirportCode);
    const response = await axios.get(
      `https://expressjs-develop-b4d1.up.railway.app/api/v1/flights?departureAirport=${departureAirportCode}&arrivalAirport=${arrivalAirportCode}&departureDate=${searchingDepartureDate}&returnDate=${searchingReturnDate}&flightClass=${passengerClass}`
    );
    dispatch(setDepartureFlights(response?.data?.departureFlights));
    dispatch(setReturnFlights(response?.data?.returnFlights));
    console.log("REDUX RESPONSE TIKET >>>", response?.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setDepartureFlights(null));
      dispatch(setReturnFlights(null));
      return;
    }
    alert(error.message);
  }
};
