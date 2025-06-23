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
import { store } from "../store.js";

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </MsalProvider>
  </StrictMode>
);
