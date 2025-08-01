import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Notifications, AccessDenied, Users } from "./pages";
import Layout from "./components/Layout";
import CallbackHandler from "./components/CallbackHandler";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/callback" element={<CallbackHandler />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/notifications" replace />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="users" element={<Users />} />
      </Route>
      <Route path="/access-denied" element={<AccessDenied />} />
    </Routes>
  );
}

export default App;
