import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departureAirport: null,
  departureAirportId: null,
  arrivalAirport: null,
  arrivalAirportId: null,
  departureDate: null,
  returnDate: null,
  penumpang: 1,
  class: "",
  roundtrip: null,
  jumlahDewasa: 1,
  jumlahAnak: 0,
  jumlahBayi: 0,
  allAirport: [],
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
    setRoundTrip: (state, action) => {
      state.roundtrip = action.payload;
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
    setAllAirport: (state, action) => {
      state.allAirport = action.payload;
    },
    setDepartureAirportId: (state, action) => {
      state.departureAirportId = action.payload;
    },
    setArrivalAirportId: (state, action) => {
      state.arrivalAirportId = action.payload;
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
  setRoundTrip,
  setJumlahDewasa,
  setJumlahAnak,
  setJumlahBayi,
  setAllAirport,
  setDepartureAirportId,
  setArrivalAirportId,
} = dataSlicer.actions;

export default dataSlicer.reducer;
