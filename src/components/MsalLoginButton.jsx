import { useMsal } from "@azure/msal-react";
import React from "react";

const MsalLoginButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect({
      scopes: ["user.read"],
    });
  };

  return (
    <button
      className="cursor-pointer bg-[#0E5239] font-light text-white p-2 rounded-md hover:bg-[#0E5239]/80 transition-all duration-300"
      onClick={handleLogin}
    >
      Giriş
    </button>
  );
};

export default MsalLoginButton;
