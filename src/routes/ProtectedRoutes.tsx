import type { RouteObject } from "react-router-dom";
import routes from "./routes.const";
import MainLayout from "@/layouts/MainLayout";
import AuthGuard from "./AuthGuard";
import Account from "@/pages/Account";

const ProtectedRoutes: RouteObject[] = [
  {
    element: <AuthGuard />,
    children: [
      {
        element: <MainLayout />,
        children: [{ path: routes.ACCOUNT, element: <Account /> }],
      },
    ],
  },
];

export default ProtectedRoutes;
