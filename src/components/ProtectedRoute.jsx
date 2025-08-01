import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loginToken } = useSelector((state) => state.global);
  if (!loginToken) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
