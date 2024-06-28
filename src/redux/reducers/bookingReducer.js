import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jenisKelamin: null,
  namaDepan: null,
  namaBelakang: null,
  tanggalLahir: null,
  email: null,
  nomorHP: null,
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
  },
});

export const {
  setJenisKelamin,
  setNamaDepan,
  setNamaBelakang,
  setTanggalLahir,
  setEmail,
  setNomorHP,
} = bookingSlicer.actions;

export default bookingSlicer.reducer;
