import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../Store/Hook";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = import.meta.env.VITE_LOGIN_URL;
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <Outlet /> : null;
};

export default PrivateRoutes;
