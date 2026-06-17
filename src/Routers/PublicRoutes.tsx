import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../Store/Hook";
import { ROUTES } from "../Constants";

const PublicRoutes = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  return isAuthenticated ? <Navigate to={ROUTES.HOME} replace /> : <Outlet />;
};

export default PublicRoutes;
