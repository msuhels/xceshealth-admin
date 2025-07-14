import { useAuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();
  const redirectTo = encodeURIComponent(location.pathname + location.search);

  if (!isAuthenticated) {
    return <Navigate to={`/auth/sign-in?redirect=${redirectTo}`} />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
