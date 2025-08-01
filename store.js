import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import globalReducer from "./src/features/global/globalSlice";
import { baseApi, loginApi } from "./src/features/api/baseApi";
import authReducer from "./src/features/auth/authSlice";
import { igsasMobilApi } from "./src/features/api/igsasMobilApi";
import { injectStore } from "./src/services/apiService";

const globalPersistConfig = {
  key: "global",
  storage,
  whitelist: ["igsasToken", "loginToken", "refreshToken", "appLoginToken"], // Tüm token'ları persist et
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
};

const persistedGlobalReducer = persistReducer(
  globalPersistConfig,
  globalReducer
);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    global: persistedGlobalReducer,
    auth: persistedAuthReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [igsasMobilApi.reducerPath]: igsasMobilApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    })
      .concat(baseApi.middleware)
      .concat(loginApi.middleware)
      .concat(igsasMobilApi.middleware),
});

injectStore(store);

export const persistor = persistStore(store);
