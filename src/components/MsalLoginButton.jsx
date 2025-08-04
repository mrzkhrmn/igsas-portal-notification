import { useMsal } from "@azure/msal-react";
import React, { useEffect } from "react";
import {
  useAppLoginMutation,
  useLoginMutation,
} from "../features/api/auth/authApi";
import { useDispatch } from "react-redux";
import {
  setAppLoginToken,
  setLoginToken,
  setRefreshToken,
} from "../features/global/globalSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MsalLoginButton = () => {
  const { instance, accounts } = useMsal();
  const [login, { isLoading }] = useLoginMutation();
  const [appLogin] = useAppLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = (message) => toast.error(message);

  const handleLogin = async () => {
    try {
      const tokenResponse = await appLogin({
        username: "username",
        password: "123456789",
      }).unwrap();
      console.log("handle login tokenResponse", tokenResponse);
      if (!tokenResponse.isSuccess) {
        notify("Giriş yapmak için yetkiniz bulunmamaktadır.");
        return;
      }
      dispatch(setAppLoginToken(tokenResponse.data.accessToken));

      const popupResult = await instance.loginPopup();

      const loginResponse = await login({
        email: accounts[0]?.username || popupResult.account?.username,
        token: tokenResponse.data.accessToken,
      }).unwrap();

      console.log("handle login loginresponse", loginResponse);
      if (!loginResponse.isSuccess) {
        notify("Giriş yapmak için yetkiniz bulunmamaktadır.");
        return;
      }

      dispatch(setLoginToken(loginResponse.data.accessToken));

      if (loginResponse.data.refreshToken) {
        dispatch(setRefreshToken(loginResponse.data.refreshToken));
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getToken() {
      const tokenResponse = await appLogin({
        username: "username",
        password: "123456789",
      }).unwrap();
      console.log("handle login tokenResponse", tokenResponse);
      if (!tokenResponse.isSuccess) {
        notify("Giriş yapmak için yetkiniz bulunmamaktadır.");
        return;
      }
      dispatch(setAppLoginToken(tokenResponse.data.accessToken));
    }
    getToken();
  }, [appLogin, dispatch]);
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
