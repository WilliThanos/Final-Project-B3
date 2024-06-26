import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jenisKelamin: null,
  namaDepan: null,
  namaBelakang: null,
  tanggalLahir: null,
  email: null,
  nomorHP: null,
  Method: null,
};

const bookingSlicer = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setJenisKelamin: (state, action) => {
      state.jenisKelamin = action.payload;
    },
    setNamaDepan: (state, action) => {
      state.namaDepan = action.payload;
    },
    setNamaBelakang: (state, action) => {
      state.namaBelakang = action.payload;
    },
    setTanggalLahir: (state, action) => {
      state.tanggalLahir = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setNomorHP: (state, action) => {
      state.nomorHP = action.payload;
    },
    serMethod: (state, action) => {
      state.Method = action.payload;
    },
  },
});

export const {
  setJenisKelamin,
  setNamaDepan,
  setNamaBelakang,
  setTanggalLahir,
  setEmail,
  setNomorHP,
  serMethod,
} = bookingSlicer.actions;

export default bookingSlicer.reducer;
