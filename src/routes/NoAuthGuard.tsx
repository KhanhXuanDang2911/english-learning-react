import { Navigate } from "react-router-dom";
import routes from "./routes.const";

interface NoAuthGuardProps {
  children: React.ReactNode;
}

export default function NoAuthGuard({ children }: NoAuthGuardProps) {
  const isAuthenticated = false;
  return !isAuthenticated ? <>{children}</> : <Navigate to={routes.HOME} />;
}
