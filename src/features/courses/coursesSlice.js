import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: {},
  loginPasswordVisibility: false,
  signupPasswordVisibility: false,
  profilePic: "",
  profilePicName: "",
  searchValue: "",
  isLoading: true,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addUserDetails: (state, { payload }) => {
      state.loggedInUser = payload;
    },
    loginVisibility: (state) => {
      state.loginPasswordVisibility = !state.loginPasswordVisibility;
    },
    signupVisibility: (state) => {
      state.signupPasswordVisibility = !state.signupPasswordVisibility;
    },
    setProfilePic: (state, { payload }) => {
      state.profilePic = payload;
    },
    searchQuery: (state, { payload }) => {
      state.searchValue = payload;
    },
    setProfilePicName: (state, { payload }) => {
      state.profilePicName = payload;
    },
  },
});

// console.log(coursesSlice);
export const {
  addUserDetails,
  loginVisibility,
  signupVisibility,
  setProfilePic,
  searchQuery,
  setProfilePicName,
} = coursesSlice.actions;

export default coursesSlice.reducer;
