import { Navigate } from "react-router-dom";
import routes from "./routes.const";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const isAuthenticated = true;
  return isAuthenticated ? <>{children}</> : <Navigate to={routes.LOGIN} />;
}
