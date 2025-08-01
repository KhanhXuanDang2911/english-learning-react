import { useRoutes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import RejectedRoutes from "./RejectedRoutes";

export default function AppRoutes() {
  const element = useRoutes([
    ...ProtectedRoutes,
    ...PublicRoutes,
    ...RejectedRoutes,
  ]);
  return <>{element}</>;
}
