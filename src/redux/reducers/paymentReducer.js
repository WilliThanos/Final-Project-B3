import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Method: null,
  Metode: "",
  Data: null,
  pesan: null,
  status: null,
  kondisi: false,
};

const paymentSlicer = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setMethod: (state, action) => {
      state.Method = action.payload;
    },
    setMetode: (state, action) => {
      state.Metode = action.payload;
    },

    setData(state, action) {
      state.Data = action.payload;
    },

    setPesan(state, action) {
      state.pesan = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setKondisi: (state, action) => {
      state.kondisi = action.payload;
    },
  },
});

export const {
  setMethod,
  setMetode,
  setData,
  setPesan,
  setStatus,
  setKondisi,
} = paymentSlicer.actions;

export default paymentSlicer.reducer;
