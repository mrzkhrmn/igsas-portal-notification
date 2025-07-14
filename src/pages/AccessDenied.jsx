import React from "react";
import { Link } from "react-router-dom";

const AccessDenied = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Giriş yapmak için yetkiniz bulunamadı. Lütfen yöneticinize başvurunuz.
      </h1>
      <Link to="/login">Tekrar giriş yapmayi dene.</Link>
    </div>
  );
};

export default AccessDenied;
