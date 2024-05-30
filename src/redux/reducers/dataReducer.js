import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departureAirport: null,
  arrivalAirport: null,
  departureDate: null,
  returnDate: null,
  penumpang: null,
  class: "",
  type: null,
};

const dataSlicer = createSlice({
  name: "data",
  initialState,
  reducers: {
    setDepartureAirport: (state, action) => {
      state.departureAirport = action.payload;
    },
    setArrivalAirport: (state, action) => {
      state.arrivalAirport = action.payload;
    },
    setDepartureDate: (state, action) => {
      console.log("action :>> ", action);
      state.departureDate = action.payload;
    },
    setReturnDate: (state, action) => {
      state.returnDate = action.payload;
    },
    setPenumpang: (state, action) => {
      state.penumpang = action.payload;
    },
    setClass: (state, action) => {
      state.class = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const {
  setDepartureAirport,
  setArrivalAirport,
  setDepartureDate,
  setReturnDate,
  setPenumpang,
  setClass,
  setType,
} = dataSlicer.actions;

export default dataSlicer.reducer;
