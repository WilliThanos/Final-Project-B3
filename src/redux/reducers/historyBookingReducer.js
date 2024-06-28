import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  historyPemesanan: null,
};

const historySlicer = createSlice({
  name: "historyBooking",
  initialState,
  reducers: {
    sethistoryPemesanan: (state, action) => {
      state.historyPemesanan = action.payload;
    },
  },
});

export const { sethistoryPemesanan } = historySlicer.actions;

export default historySlicer.reducer;
