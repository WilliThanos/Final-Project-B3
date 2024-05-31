import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departureAirport: null,
  arrivalAirport: null,
  departureDate: null,
  returnDate: null,
  penumpang: 0,
  class: "",
  type: null,
  jumlahDewasa: 0,
  jumlahAnak: 0,
  jumlahBayi: 0,
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
    setJumlahDewasa: (state, action) => {
      state.jumlahDewasa = action.payload;
    },
    setJumlahAnak: (state, action) => {
      state.jumlahAnak = action.payload;
    },
    setJumlahBayi: (state, action) => {
      state.jumlahBayi = action.payload;
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
  setJumlahDewasa,
  setJumlahAnak,
  setJumlahBayi,
} = dataSlicer.actions;

export default dataSlicer.reducer;
