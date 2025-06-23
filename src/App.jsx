import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Notifications, Campaigns } from "./pages";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/notifications" replace />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="campaigns" element={<Campaigns />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
