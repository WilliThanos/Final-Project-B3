import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "../action/dataAction";

const initialState = {
  profile: null,
  updateProfile: null,
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
  },
});

export const { setProfile, setUpdateProfile } = profileSlicer.actions;

export default profileSlicer.reducer;
