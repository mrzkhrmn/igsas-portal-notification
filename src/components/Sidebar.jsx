import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CompanyLogo from "../assets/icons/igsas-logo.png";
import NotificationIcon from "../constants/icons/notificationIcon";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: "Bildirimler",
      icon: <NotificationIcon />,
      path: "/notifications",
    },
    {
      title: "Kampanyalar",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
      ),
      path: "/campaigns",
    },
  ];

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-4">
        <div className="flex items-center justify-center">
          <img src={CompanyLogo} alt="IGSAŞ Logo" className="h-8" />
        </div>
        <h2 className="text-sm text-gray-400 mt-8 mb-4">Uygulamalar</h2>
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            // Aktif durumu URL'den belirle
            const isActive = location.pathname === item.path;

            return (
              <button
                onClick={() => handleClick(item.path)}
                key={index}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                  isActive
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className={isActive ? "text-green-600" : "text-gray-500"}>
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.title}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
