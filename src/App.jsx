import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Notifications, AccessDenied } from "./pages";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import CallbackHandler from "./components/CallbackHandler";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/callback" element={<CallbackHandler />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/notifications" replace />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
      <Route path="/access-denied" element={<AccessDenied />} />
    </Routes>
  );
}

export default App;
