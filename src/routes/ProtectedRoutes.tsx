import type { RouteObject } from "react-router-dom";
import routes from "./routes.const";
import MainLayout from "@/layouts/MainLayout";
import Profile from "@/pages/Profile";
import AuthGuard from "./AuthGuard";

const ProtectedRoutes: RouteObject[] = [
  {
    element: <AuthGuard />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: routes.PROFILE,
            element: <Profile />,
          },
        ],
      },
    ],
  },
];

export default ProtectedRoutes;
