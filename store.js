import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import globalReducer from "./src/features/global/globalSlice";
import { baseApi } from "./src/features/api/baseApi";
import authReducer from "./src/features/auth/authSlice";
import { igsasMobilApi } from "./src/features/api/igsasMobilApi";
import { injectStore } from "./src/services/apiService";

// Global state için persist yapılandırması
const globalPersistConfig = {
  key: "global",
  storage,
  whitelist: ["panelOidToken", "igsasToken"], // Sadece token'ları persist et
};

// Auth state için persist yapılandırması
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"], // Token ve user bilgilerini persist et
};

// Persist edilmiş reducer'lar
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
    [igsasMobilApi.reducerPath]: igsasMobilApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    })
      .concat(baseApi.middleware)
      .concat(igsasMobilApi.middleware),
});

// Store'u apiService'e enjekte et
injectStore(store);

export const persistor = persistStore(store);
