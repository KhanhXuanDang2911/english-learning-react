import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "@/context/AuthContext";
import routes from "./routes.const";

export default function ForceCreatePasswordGuard() {
  const { isAuthenticated, user } = useAuth().state;
  const location = useLocation();

  if (
    isAuthenticated &&
    user?.noPassword &&
    location.pathname !== routes.CREATE_PASSWORD
  ) {
    return <Navigate to={routes.CREATE_PASSWORD} replace />;
  }

  return <Outlet />;
}
