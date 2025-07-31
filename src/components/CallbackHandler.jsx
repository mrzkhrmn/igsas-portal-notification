import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setCredentials } from "../features/auth/authSlice";

const CallbackHandler = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // token'i decode edip user verisini alabilirsin (jwt-decode ile)
      const user = {}; // örnek olarak, backend user objesini gönderebilir
      dispatch(setCredentials({ token, user }));
      navigate("/notifications");
    } else {
      navigate("/login");
    }
  }, [token, dispatch, navigate]);

  return <p>Yönlendiriliyorsunuz...</p>;
};

export default CallbackHandler;
