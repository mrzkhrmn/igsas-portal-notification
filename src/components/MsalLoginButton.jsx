import React from "react";

const MsalLoginButton = () => {
  const handleLogin = async () => {
    window.location.href =
      "https://igsas-portal-bildirim.ranna.com.tr/AuthLogin";
  };
  return (
    <button
      className="cursor-pointer bg-[#0E5239] font-light text-white p-2 rounded-md hover:bg-[#0E5239]/80 transition-all duration-300"
      onClick={handleLogin}
    >
      Microsoft hesabı ile giriş yap
    </button>
  );
};

export default MsalLoginButton;
