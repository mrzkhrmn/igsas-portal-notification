import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./src/features/global/globalSlice";
import { baseApi, igsasApi } from "./src/features/api/baseApi";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [igsasApi.reducerPath]: igsasApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(igsasApi.middleware),
});
