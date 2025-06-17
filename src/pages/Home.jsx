import React from "react";
import CompanyLogo from "../assets/icons/igsas-logo.png";
import LoginImage from "../assets/images/login-image.jpg";

const Home = () => {
  return (
    <div className=" relative">
      <img src={CompanyLogo} alt="Company Logo" />
      <div className="flex border h-screen">
        <div className="w-[70%] h-full">
          <img src={LoginImage} alt="Login Illustration" className="n h-full" />
        </div>
        <div className="w-[30%]">
          <h2>{`İgsaş Bildirim \n Arayüzüne Hoş Geldiniz`}</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
