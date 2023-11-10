import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const jwtToken = Cookies.get("jwtToken");
  return jwtToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
