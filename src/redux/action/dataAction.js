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
import {
  setProfile,
  setUpdateProfile,
  setNotif,
} from "../reducers/profileReducer";

import FormData from "form-data";

import { logout } from "../reducers/authReducer";

export const updateProfile = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { first_name, last_name, password, confirmPassword, file } =
      state.profile.updateProfile;
    const token = state.auth.token;

    let data = new FormData();
    data.append("first_name", first_name);
    data.append("last_name", last_name);
    data.append("password", password);
    data.append("confirmPassword", confirmPassword);
    data.append("gambar_url", file);


    const config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "https://expressjs-develop-b4d1.up.railway.app/api/v1/profil",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const response = await axios.request(config);

    dispatch(setUpdateProfile(response?.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      dispatch(setUpdateProfile(error.response?.data));
      return;
    }
    console.error("Error:", error.message);
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
    };

    const response = await axios.get(
      "https://expressjs-develop-b4d1.up.railway.app/api/v1/profil",
      config
    );

    dispatch(setProfile(response?.data?.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error);
      alert(error?.message);
      dispatch(logout());
      return;
    }
    alert(error?.message);
    dispatch(logout());
  }
};

export const getDepartureAirport = () => async (dispatch, getState) => {
  try {
    const id = getState().data?.departureAirportId;

    const response = await axios.get(
      `https://expressjs-develop-b4d1.up.railway.app/api/v1/bandara/${id}`
    );
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

    const response = await axios.get(
      `https://expressjs-develop-b4d1.up.railway.app/api/v1/bandara/${id}`
    );
    dispatch(setArrivalAirport(response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getSearchTicketReturn = () => async (dispatch, getState) => {
  try {
    const departureAirportCode = getState().data?.departureAirport?.iata_code;
    const arrivalAirportCode = getState().data?.arrivalAirport?.iata_code;
    const departureDate = getState().data?.departureDate;
    const returnDate = getState().data?.returnDate;
    const ticketClass = getState().data?.class;
    const page = getState().data?.pageReturn;

    const passengerClass =
      ticketClass !== null ? ticketClass.toUpperCase() : null;

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

    const searchingReturnDate = parseAndFormatDate(formattedReturnDate);

    const response = await axios.get(
      `https://expressjs-develop-b4d1.up.railway.app/api/v1/flights?departureAirport=${departureAirportCode}&arrivalAirport=${arrivalAirportCode}&departureDate=${searchingDepartureDate}&returnDate=${searchingReturnDate}&flightClass=${passengerClass}&page=${page}&limit=10`
    );
    dispatch(setReturnFlights(response?.data?.returnFlights));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setReturnFlights(null));
      return;
    }
    alert(error.message);
  }
};

export const getSearchTicketDeparture = () => async (dispatch, getState) => {
  try {
    const departureAirportCode = getState().data?.departureAirport?.iata_code;
    const arrivalAirportCode = getState().data?.arrivalAirport?.iata_code;
    const departureDate = getState().data?.departureDate;
    const returnDate = getState().data?.returnDate;
    const ticketClass = getState().data?.class;
    const page = getState().data?.pageDeparture;

    const passengerClass =
      ticketClass !== null ? ticketClass.toUpperCase() : null;

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

    const searchingReturnDate = parseAndFormatDate(formattedReturnDate);

    const response = await axios.get(
      `https://expressjs-develop-b4d1.up.railway.app/api/v1/flights?departureAirport=${departureAirportCode}&arrivalAirport=${arrivalAirportCode}&departureDate=${searchingDepartureDate}&returnDate=${searchingReturnDate}&flightClass=${passengerClass}&page=${page}&limit=10`
    );
    dispatch(setDepartureFlights(response?.data?.departureFlights));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(setDepartureFlights(null));
      return;
    }
    alert(error.message);
  }
};

export const getNotification = () => async (dispatch, getState) => {
  try {
    const token = getState().auth?.token;
    const id = getState().auth?.user?.id;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(
      `https://expressjs-develop-b4d1.up.railway.app/api/v1/notifikasi/${id}`,
      config
    );

    dispatch(setNotif(response?.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error);
      alert(error?.message);

      return;
    }
    alert(error?.message);
  }
};
