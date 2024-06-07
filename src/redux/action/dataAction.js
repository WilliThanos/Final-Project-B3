import axios from "axios";
import {
  setAllAirport,
  setDepartureAirport,
  setArrivalAirport,
} from "../reducers/dataReducer";

export const getAllAirports = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `https://be-km-6-infotiket-in-b3-final-project-lngd3exkq.vercel.app/api/v1/bandara`
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

export const getDepartureAirport = () => async (dispatch, getState) => {
  try {
    const id = getState().data?.departureAirportId;
    // const allAirport = getState().data?.allAirport;
    // const departureAirport = allAirport?.find((airport) => airport.id === id);
    // console.log("departureAirport :>> ", departureAirport);
    console.log("REDUX id", id);
    const response = await axios.get(
      `https://be-km-6-infotiket-in-b3-final-project-lngd3exkq.vercel.app/api/v1/bandara/${id}`
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
      `https://be-km-6-infotiket-in-b3-final-project-lngd3exkq.vercel.app/api/v1/bandara/${id}`
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
