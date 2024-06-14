import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterClass: null,
  sortHarga: null,
};

const filterSlicer = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterClass: (state, action) => {
      state.filterClass = action.payload;
    },
    setSortHarga: (state, action) => {
      state.sortHarga = action.payload;
    },
  },
});

export const { setFilterClass, setSortHarga } = filterSlicer.actions;

export default filterSlicer.reducer;
