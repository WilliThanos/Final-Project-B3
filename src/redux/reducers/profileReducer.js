import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "../action/dataAction";

const initialState = {
  profile: null,
  updateProfile: null,
  Modal: false,
  notif: null,
};

const profileSlicer = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setUpdateProfile: (state, action) => {
      state.updateProfile = action.payload;
    },
    setModal: (state, action) => {
      state.Modal = action.payload;
    },

    hapusProfile: (state) => {
      state.profile = null;
    },
  
    setNotif: (state, action) => {
      state.notif = action.payload;
    },
  },
});

export const { setProfile, setUpdateProfile, setModal, setNotif,hapusProfile } =

  profileSlicer.actions;

export default profileSlicer.reducer;
