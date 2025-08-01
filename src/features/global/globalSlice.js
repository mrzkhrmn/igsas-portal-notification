import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  appLoginToken: null,
  loginToken: null,
  refreshToken: null,
  igsasToken: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAppLoginToken: (state, action) => {
      state.appLoginToken = action.payload;
    },
    setLoginToken: (state, action) => {
      state.loginToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setIgsasToken: (state, action) => {
      state.igsasToken = action.payload;
    },
    logout: (state) => {
      state.igsasToken = null;
      state.appLoginToken = null;
      state.loginToken = null;
      state.refreshToken = null;
    },
  },
});

export const {
  setIsLoading,
  setAppLoginToken,
  setLoginToken,
  setRefreshToken,
  setIgsasToken,
  logout,
} = globalSlice.actions;
export default globalSlice.reducer;
