import { useMsal } from "@azure/msal-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/api/auth/authApi";
import { useDispatch } from "react-redux";
import { setPanelOidToken } from "../features/global/globalSlice";

const MsalLoginButton = () => {
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      await instance.loginPopup();
      const response = await login({
        email: accounts[0]?.username,
        azureId: accounts[0]?.idTokenClaims?.oid,
      });

      if (!response.data.isSuccess) {
        console.log(response.data.message);
        return;
      }

      dispatch(setPanelOidToken(response.data.data.accessToken));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      disabled={isLoading}
      className="cursor-pointer bg-[#0E5239] font-light text-white p-2 rounded-md hover:bg-[#0E5239]/80 transition-all duration-300"
      onClick={handleLogin}
    >
      {isLoading ? "Giriş yapılıyor..." : "Microsoft hesabı ile giriş yap"}
    </button>
  );
};

export default MsalLoginButton;
