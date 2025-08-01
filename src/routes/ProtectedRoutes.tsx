import type { RouteObject } from "react-router-dom";
import routes from "./routes.const";
import MainLayout from "@/layouts/MainLayout";
import Profile from "@/pages/Profile";
import AuthGuard from "./AuthGuard";

const ProtectedRoutes: RouteObject[] = [
  {
    path: routes.PROFILE,
    element: (
      <AuthGuard>
        <MainLayout>
          <Profile />
        </MainLayout>
      </AuthGuard>
    ),
  },
];

export default ProtectedRoutes;
