import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departureFlights: [],
  returnFlights: [],
  selectedDepartureFlight: null,
  selectedReturnFlight: null,
};

const ticketSlicer = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setDepartureFlights: (state, action) => {
      state.departureFlights = action.payload;
    },
    setReturnFlights: (state, action) => {
      state.returnFlights = action.payload;
    },
    setSelectedDepartureFlight: (state, action) => {
      state.selectedDepartureFlight = action.payload;
    },
    setSelectedReturnFlight: (state, action) => {
      state.selectedReturnFlight = action.payload;
    },
  },
});

export const {
  setDepartureFlights,
  setReturnFlights,
  setSelectedDepartureFlight,
  setSelectedReturnFlight,
} = ticketSlicer.actions;

export default ticketSlicer.reducer;
