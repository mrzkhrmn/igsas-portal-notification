import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  panelOidToken: null,
  igsasToken: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPanelOidToken: (state, action) => {
      state.panelOidToken = action.payload;
    },
    setIgsasToken: (state, action) => {
      state.igsasToken = action.payload;
    },
    logout: (state) => {
      state.igsasToken = null;
      state.panelOidToken = null;
    },
  },
});

export const { setIsLoading, setPanelOidToken, setIgsasToken, logout } =
  globalSlice.actions;
export default globalSlice.reducer;
