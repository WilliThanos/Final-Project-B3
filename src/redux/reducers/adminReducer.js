import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  akun: null,
};

const adminSlicer = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAkun: (state, action) => {
      state.akun = action.payload;
    },
  },
});

export const { setAkun } = adminSlicer.actions;

export default adminSlicer.reducer;
