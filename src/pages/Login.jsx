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
              <div className="flex flex-col w-full">
                <label className=" text-gray-500" htmlFor="username">
                  E-Posta
                </label>
                <input
                  type="text"
                  label="john.doe@example.com"
                  placeholder="Kullanıcı Adı"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex justify-between w-full">
                  <label className=" text-gray-500" htmlFor="username">
                    Şifre
                  </label>
                  <p className="text-sm text-gray-500">Şifremi Unuttum</p>
                </div>
                <input
                  type="password"
                  placeholder="Şifrenizi giriniz"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                <input type="checkbox" className="w-5 h-5" />
                <label className=" text-gray-500" htmlFor="username">
                  Beni Hatırla
                </label>{" "}
              </div>
              <MsalLoginButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
