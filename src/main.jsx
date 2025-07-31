import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./utils/authConfig";
import { PublicClientApplication } from "@azure/msal-browser";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store.js";
import { ToastContainer } from "react-toastify";

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <ToastContainer />
            <App />
          </Router>
        </PersistGate>
      </Provider>
    </MsalProvider>
  </StrictMode>
);
