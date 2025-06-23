import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./src/features/global/globalSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});
