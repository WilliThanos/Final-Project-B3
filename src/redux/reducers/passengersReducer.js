import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  passengers: [],
  bookedPassengers: null,
};

const passengersSlice = createSlice({
  name: "passengers",
  initialState,
  reducers: {
    addPassenger: (state, action) => {
      state.passengers.push(action.payload);
    },
    updatePassenger: (state, action) => {
      const { index, field, value } = action.payload;
      state.passengers[index][field] = value;
    },
    setPassengers: (state, action) => {
      state.passengers = action.payload;
    },
    setBookedPassengers: (state, action) => {
      state.bookedPassengers = action.payload;
    },
  },
});

export const {
  addPassenger,
  updatePassenger,
  setPassengers,
  setBookedPassengers,
} = passengersSlice.actions;

export default passengersSlice.reducer;
