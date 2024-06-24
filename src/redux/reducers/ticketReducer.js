import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";

const initialState = {
  departureFlights: [],
  returnFlights: [],
  selectedDepartureFlight: "",
  selectedReturnFlight: "",
  selectedDepartureFlightId: "",
  selectedReturnFlightId: "",
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
    setSelectedDepartureFlightId: (state, action) => {
      state.selectedDepartureFlightId = action.payload;
    },
    setSelectedReturnFlightId: (state, action) => {
      state.selectedReturnFlightId = action.payload;
    },
    // clearSelectedTicket: (state) => {
    //   state.selectedDepartureFlight = null;
    //   state.selectedReturnFlight = null;
    // },
    // clearTicket: (state) => {
    //   state.departureFlights = [];
    //   state.returnFlights = [];
    // },
  },
});

export const {
  setDepartureFlights,
  setReturnFlights,
  setSelectedDepartureFlight,
  setSelectedReturnFlight,
  setSelectedDepartureFlightId,
  setSelectedReturnFlightId,
} = ticketSlicer.actions;

export default ticketSlicer.reducer;
