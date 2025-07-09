import React from "react";
import CompanyLogo from "../assets/icons/igsas-logo.png";
import LoginImage from "../assets/images/login-image.jpg";
import MsalLoginButton from "../components/MsalLoginButton";

const Login = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="px-10 py-4">
        <img src={CompanyLogo} alt="Company Logo" />
      </div>
      <div className="flex h-full">
        <div className="hidden sm:block w-[60%] lg:w-[70%] h-full">
          <img
            src={LoginImage}
            alt="Login Illustration"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="w-full sm:w-[40%] lg:w-[30%] relative bg-[#d6d6d618] items-center justify-center flex">
          <div className="mb-20 flex flex-col gap-4 items-center justify-center h-full  w-[75%]">
            <h2 className="font-medium text-3xl text-black w-full">
              İgsaş Bildirim <br /> Arayüzüne Hoş Geldiniz
            </h2>
            <div className="flex flex-col gap-4 w-full">
              <MsalLoginButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
