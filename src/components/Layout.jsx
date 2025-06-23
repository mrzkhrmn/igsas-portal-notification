import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="h-screen flex flex-row">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden bg-gray-50">
        <div className="p-6">
          <Header />
        </div>
        <main className="flex-1 overflow-auto ">
          <div className="px-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
