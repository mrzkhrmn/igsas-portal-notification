import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  idToken: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIdToken: (state, action) => {
      state.idToken = action.payload;
    },
  },
});

export const { setIsLoading, setIdToken } = globalSlice.actions;
export default globalSlice.reducer;
