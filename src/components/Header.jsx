import React from "react";
import CompanyLogo from "../assets/icons/igsas-logo.png";
import NotificationIcon from "../constants/icons/notificationIcon";
import { logout } from "../features/global/globalSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { instance } = useMsal();

  const handleLogout = async () => {
    try {
      dispatch(logout());

      await instance.logoutPopup({
        postLogoutRedirectUri: "/login",
        mainWindowRedirectUri: "/login",
      });
    } catch (error) {
      console.error("Logout hatası:", error);
      navigate("/login");
    }
  };
  return (
    <header className="shadow-lg rounded-lg bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
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
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 cursor-pointer"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
