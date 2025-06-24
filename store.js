import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./src/features/global/globalSlice";
import { baseApi } from "./src/features/api/baseApi";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
