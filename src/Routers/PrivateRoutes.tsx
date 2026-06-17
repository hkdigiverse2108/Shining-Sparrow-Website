import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../Store/Hook";
import { ROUTES } from "../Constants";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.AUTH.BASE} replace />;
};

export default PrivateRoutes;
