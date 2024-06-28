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
    hapus: (state) => {
      state.historyPemesanan = null;
      localStorage.removeItem("persist:root3");
    },
  },
});

export const { sethistoryPemesanan, hapus } = historySlicer.actions;

export default historySlicer.reducer;
