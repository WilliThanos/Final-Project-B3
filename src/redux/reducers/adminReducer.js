import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  akun: null,
  pesan: null,
  id: null,
};

const adminSlicer = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAkun: (state, action) => {
      state.akun = action.payload;
    },
    setPesanAdmin: (state, action) => {
      state.pesan = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setAkun, setPesanAdmin, setId } = adminSlicer.actions;

export default adminSlicer.reducer;
