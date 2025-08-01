import { useMsal } from "@azure/msal-react";
import React from "react";
import {
  useAppLoginMutation,
  useLoginMutation,
} from "../features/api/auth/authApi";
import { useDispatch } from "react-redux";
import {
  setAppLoginToken,
  setLoginToken,
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

      if (!tokenResponse.isSuccess) {
        notify("Giriş yapmak için yetkiniz bulunmamaktadır.");
        return;
      }

      console.log(accounts[0]?.username);

      dispatch(setAppLoginToken(tokenResponse.data.accessToken));
      await instance.loginPopup();
      const loginResponse = await login({
        email: accounts[0]?.username,
      }).unwrap();

      console.log("loginresponse", loginResponse);
      // if (!loginResponse.data.data.hasAccess) {
      //   notify("Giriş yapmak için yetkiniz bulunmamaktadır.");
      //   return;
      // }

      dispatch(setLoginToken(loginResponse.data.accessToken));
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
