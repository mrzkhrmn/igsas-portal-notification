import React from "react";
import CompanyLogo from "../assets/icons/igsas-logo.png";
import NotificationIcon from "../constants/icons/notificationIcon";

const Header = () => {
  return (
    <header className="shadow-lg rounded-lg bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between w-full">
      {/* Sağ taraf - Dil seçimi ve kullanıcı bilgileri */}
      <div className="flex items-center gap-4">
        {/* Kullanıcı bilgileri */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">JD</span>
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-gray-900">John Doe</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* Bildirim ikonu */}
        <div className="relative">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <NotificationIcon />
            <span className="absolute -top-0 -right-0 bg-red-500 text-white text-xs rounded-full w-4.5 h-4.5 flex items-center justify-center">
              1
            </span>
          </button>
        </div>
        {/* Dil seçimi */}
        <div className="flex items-center gap-2">
          <img
            src="https://flagicons.lipis.dev/flags/4x3/tr.svg"
            alt="English"
            className="w-5 h-4"
          />
          <span className="text-sm text-gray-600">Türkçe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
