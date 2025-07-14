import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Notifications, AccessDenied } from "./pages";
import Layout from "./components/Layout";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

function App() {
  return (
    <Routes>
      <UnauthenticatedTemplate>
        <Route path="/login" element={<Login />} />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/notifications" replace />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </AuthenticatedTemplate>
      <Route path="/access-denied" element={<AccessDenied />} />
    </Routes>
  );
}

export default App;
